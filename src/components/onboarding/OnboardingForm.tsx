"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { api } from "@/trpc/react";
import { useUser } from "@clerk/nextjs";
import { useRouter, redirect } from "next/navigation";
import { useQueryState, parseAsInteger } from "nuqs";
import { useStorage } from "@/hooks/useStorage";
import { UserRole } from "@/db/schema";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Heading from "@/components/atoms/Heading";
import Text from "@/components/atoms/Text";
import Logo from "@/components/atoms/Logo";
import { toast } from "sonner";

const onboardingSchema = z.object({
  displayName: z.string().min(3, "Display name must be at least 3 characters"),
  role: z.nativeEnum(UserRole).optional(),
  avatarUrl: z.string().optional(),
});

type OnboardingValues = z.infer<typeof onboardingSchema>;

const steps = [
  { id: "identity", title: "Who are you?", description: "Choose a display name to protect your privacy." },
  { id: "role", title: "What's your role?", description: "Tell us how you use Property Pledge." },
];

export default function OnboardingForm() {
  const [currentStep, setCurrentStep] = useQueryState("step", parseAsInteger.withDefault(0));
  const { user } = useUser();
  const router = useRouter();
  const completeOnboarding = api.users.completeOnboarding.useMutation();

  const [persistedValues, setPersistedValues] = useStorage<Partial<OnboardingValues>>(
    "onboarding_data",
    {},
    "session"
  );

  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<OnboardingValues>({
    resolver: zodResolver(onboardingSchema),
    defaultValues: {
      displayName: persistedValues.displayName ?? user?.username ?? "",
      role: persistedValues.role,
      avatarUrl: persistedValues.avatarUrl,
    },
  });

  // Sync form changes to storage using subscription to avoid infinite loops
  useEffect(() => {
    const subscription = watch((value) => {
      setPersistedValues(value);
    });
    return () => subscription.unsubscribe();
  }, [watch, setPersistedValues]);

  const onSubmit = async (data: OnboardingValues) => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
      return;
    }

    if (!user) {
      toast.error("User not found. Please try again.");
      return;
    }

    if (!data.role) {
      toast.error("Please select a role before finishing.");
      setCurrentStep(1); // Go back to role step
      return;
    }

    const toastId = toast.loading("Completing your profile...");

    try {
      await completeOnboarding.mutateAsync({
        displayName: data.displayName,
        role: data.role,
        avatarUrl: data.avatarUrl,
      });

      toast.success("Profile completed successfully!", { id: toastId });
      setPersistedValues({}); // Clear storage on success
      user?.reload()
      redirect("/dashboard");
    } catch (err: any) {
      console.error("Onboarding submission error:", err);
      toast.error(err.message || "Failed to complete onboarding. Please try again.", { id: toastId });
    }
  };

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 0));

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 bg-[url('/wavy2.png')] bg-fixed bg-center bg-cover px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <Logo className="w-12 mx-auto mb-4" />
          <Heading as="h1" className="text-3xl font-bold tracking-tight text-gray-900">
            Welcome to Property Pledge
          </Heading>
          <Text className="mt-2 text-sm text-gray-600">
            Let's get your profile set up in just a few steps.
          </Text>
        </div>

        <div className="relative mt-8">
          <div className="absolute left-0 top-1/2 h-0.5 w-full -translate-y-1/2 bg-gray-200" />
          <div 
            className="absolute left-0 top-1/2 h-0.5 bg-primary transition-all duration-500 ease-in-out" 
            style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
          />
          <div className="relative flex justify-between">
            {steps.map((step, index) => (
              <div 
                key={step.id} 
                className={`flex h-8 w-8 items-center justify-center rounded-full border-2 transition-colors duration-500 ${
                  index <= currentStep ? "border-primary bg-primary text-white" : "border-gray-300 bg-white text-gray-500"
                }`}
              >
                {index + 1}
              </div>
            ))}
          </div>
        </div>

        <Card className="mt-8 border-none shadow-xl">
          <CardHeader>
            <CardTitle>{steps[currentStep]?.title}</CardTitle>
            <CardDescription>{steps[currentStep]?.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {currentStep === 0 && (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label htmlFor="displayName" className="text-sm font-medium text-gray-700">
                          Display Name
                        </label>
                        <Input
                          id="displayName"
                          {...register("displayName")}
                          placeholder="e.g. AnonymousTenant99"
                          className={errors.displayName ? "border-red-500" : ""}
                        />
                        {errors.displayName && (
                          <p className="text-xs text-red-500">{errors.displayName.message}</p>
                        )}
                      </div>
                    </div>
                  )}

                  {currentStep === 1 && (
                    <div className="grid grid-cols-1 gap-4">
                      {[UserRole.TENANT, UserRole.LANDLORD, UserRole.LEASEHOLDER].map((role) => (
                        <button
                          key={role}
                          type="button"
                          onClick={() => {
                            setValue("role", role);
                            handleSubmit(onSubmit)();
                          }}
                          className={`flex items-center justify-between rounded-lg border p-4 transition-all hover:bg-gray-50 ${
                            watch("role") === role ? "border-primary bg-primary/5 ring-1 ring-primary" : "border-gray-200"
                          }`}
                        >
                          <span className="font-medium text-gray-900">{role}</span>
                          {watch("role") === role && (
                            <div className="size-4 rounded-full bg-primary" />
                          )}
                        </button>
                      ))}
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
 
              <div className="flex justify-between pt-4">
                {currentStep > 0 && (
                  <Button type="button" variant="outline" onClick={prevStep}>
                    Back
                  </Button>
                )}
                <div className="ml-auto">
                  {currentStep < steps.length - 1 ? (
                    <Button type="button" onClick={nextStep}>
                      Next
                    </Button>
                  ) : (
                    <Button type="submit" disabled={completeOnboarding.isPending}>
                      {completeOnboarding.isPending ? "Setting up..." : "Finish"}
                    </Button>
                  )}
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
