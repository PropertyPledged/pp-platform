"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSession } from "@/lib/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Card, CardContent } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import StepPersonalDetails from "./steps/StepPersonalDetails";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { markUserAsOnboarded } from "@/server/actions";
import { Building2, Search, ShieldCheck, Star } from "lucide-react";

const onboardingSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  role: z.enum(["tenant", "landlord", "leaseholder"], {
    required_error: "Please select a role",
  }),
  phone: z
    .string()
    .optional()
    .refine((value) => !value || value.trim().length >= 7, "Please enter a valid phone number"),
  destination: z.enum(["profile", "search"], {
    required_error: "Please choose where to go next",
  }),
});

export type OnboardingValues = z.infer<typeof onboardingSchema>;

const STEPS = [
  { id: 1, name: "About Property Pledge" },
  { id: 2, name: "Your details" },
];

export default function OnboardingForm() {
  const { data: session } = useSession();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const form = useForm<OnboardingValues>({
    resolver: zodResolver(onboardingSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      role: undefined,
      destination: "search",
    },
    mode: "onChange",
  });

  useEffect(() => {
    if (session?.user) {
      if (!form.getValues("name") && session.user.name) {
        form.setValue("name", session.user.name);
      }
      if (!form.getValues("email") && session.user.email) {
        form.setValue("email", session.user.email);
      }
      if (!form.getValues("role") && session.user.role) {
        form.setValue("role", session.user.role as "tenant" | "leaseholder" | "landlord");
      }
      if (!form.getValues("phone") && session.user.phoneNumber) {
        form.setValue("phone", session.user.phoneNumber);
      }
    }
  }, [session, form]);

  const handleNext = async () => {
    const isValid =
      currentStep === 1
        ? true
        : await form.trigger(["name", "email", "phone", "role", "destination"]);

    if (isValid) {
      setCurrentStep((prev) => Math.min(prev + 1, STEPS.length));
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const onSubmit = async (data: OnboardingValues) => {
    setIsSubmitting(true);
    try {
      await markUserAsOnboarded({
        name: data.name,
        role: data.role,
        phoneNumber: data.phone?.trim() ? data.phone.trim() : undefined,
      });
      toast.success("Welcome to Property Pledge");
      router.push(data.destination === "profile" ? "/account" : "/dashboard");
    } catch (error) {
      toast.error("Failed to complete profile");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full border-none shadow-none bg-transparent">
      <CardContent className="p-0">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-semibold text-gray-900">
            Let&apos;s get you started
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            A quick intro and a few details to personalize your experience
          </p>
        </div>

        {/* Progress Indicator */}
        <div className="mb-8 flex items-center justify-center space-x-4">
          {STEPS.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div
                className={cn(
                  "flex items-center space-x-2",
                  currentStep >= step.id ? "text-gray-900" : "text-gray-400"
                )}
              >
                <div
                  className={cn(
                    "flex h-5 w-5 items-center justify-center rounded-full text-[10px]",
                    currentStep > step.id
                      ? "bg-orange-500 text-white"
                      : currentStep === step.id
                      ? "border-2 border-slate-600 bg-slate-600"
                      : "border-2 border-gray-200 bg-gray-200"
                  )}
                >
                  {currentStep > step.id && (
                    <svg
                      className="h-3 w-3"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  )}
                  {currentStep === step.id && (
                    <div className="h-2 w-2 rounded-full bg-white" />
                  )}
                </div>
                <span className="text-sm font-medium">{step.name}</span>
              </div>
              {index < STEPS.length - 1 && (
                <div className="mx-4 h-[1px] w-12 bg-gray-200" />
              )}
            </div>
          ))}
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {currentStep === 1 && (
              <div className="space-y-6 rounded-2xl border border-slate-200 bg-white/80 p-6">
                <div>
                  <h2 className="text-xl font-semibold text-slate-900">Trustpilot for property and rentals</h2>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    Property Pledge helps tenants, leaseholders, and landlords share verified property
                    experiences so everyone can make smarter rental decisions.
                  </p>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                    <ShieldCheck className="h-5 w-5 text-slate-700" />
                    <p className="mt-2 text-sm font-medium text-slate-900">Verified voices</p>
                    <p className="text-xs text-slate-600">
                      Real renters and owners sharing credible property feedback.
                    </p>
                  </div>
                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                    <Search className="h-5 w-5 text-slate-700" />
                    <p className="mt-2 text-sm font-medium text-slate-900">Find a property fast</p>
                    <p className="text-xs text-slate-600">
                      Search if a property is already reviewed before you commit.
                    </p>
                  </div>
                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                    <Star className="h-5 w-5 text-slate-700" />
                    <p className="mt-2 text-sm font-medium text-slate-900">Leave better reviews</p>
                    <p className="text-xs text-slate-600">
                      Help others with transparent insight on rental experiences.
                    </p>
                  </div>
                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                    <Building2 className="h-5 w-5 text-slate-700" />
                    <p className="mt-2 text-sm font-medium text-slate-900">Built for every role</p>
                    <p className="text-xs text-slate-600">
                      Whether you rent or manage, your perspective matters here.
                    </p>
                  </div>
                </div>
              </div>
            )}
            {currentStep === 2 && <StepPersonalDetails />}

            <div className="mt-8">
              {currentStep === 1 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="w-full rounded-md bg-slate-900 py-3 text-sm font-medium text-white hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2"
                >
                  Continue to profile setup
                </button>
              ) : (
                <div className="flex space-x-4">
                  <button
                    type="button"
                    onClick={handleBack}
                    className="w-full rounded-md border border-gray-300 bg-white py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full rounded-md bg-slate-900 py-3 text-sm font-medium text-white hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "Saving..." : "Save and continue"}
                  </button>
                </div>
              )}
            </div>

            <p className="mt-6 text-center text-xs text-gray-500">
              <span className="font-medium text-slate-900">
                We value your privacy.
              </span>{" "}
              Your information is secure and will not be shared without your
              permission.
            </p>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
