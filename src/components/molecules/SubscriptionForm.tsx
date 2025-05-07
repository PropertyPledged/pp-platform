"use client";

import { cn } from "@/lib/utils";
import {
  subscriptionSchema,
  type SubscriptionType,
} from "@/schemas/subscription";
import { api } from "@/trpc/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleCheckBig, Loader } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

type SubscriptionFormProps = {
  hideLabel?: boolean;
  bgMode?: "dark" | "light";
} & React.ComponentProps<"form">;

function SubscriptionForm({
  bgMode = "dark",
  hideLabel = false,
  ...props
}: SubscriptionFormProps) {
  const [showDone, setShowDone] = useState(false);
  const form = useForm<SubscriptionType>({
    resolver: zodResolver(subscriptionSchema),
    defaultValues: {
      email: "",
    },
  });
  const subscribe = api.subscription.subscribe.useMutation({
    onSettled: async () => {
      setShowDone(true);
      form.reset({
        email: "",
      });

      setTimeout(() => {
        setShowDone(false);
      }, 4000);
    },
  });

  const onSubmit = form.handleSubmit(async (values) => {
    subscribe.mutate({ ...values });
  });
  return (
    <Form {...form}>
      <form
        id="subscribe"
        className="flex w-full flex-col gap-3 lg:flex-row lg:items-end"
        {...props}
        onSubmit={onSubmit}
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="relative">
              <FormLabel
                htmlFor="email"
                className={cn("text-base", {
                  "sr-only": hideLabel,
                })}
              >
                Your email
              </FormLabel>
              <br />
              <FormControl>
                <Input
                  {...field}
                  placeholder="Enter your email"
                  disabled={subscribe.isPending}
                  type="email"
                  required
                  className={cn(
                    "h-12 w-full border-gray-100 bg-white/10 placeholder:text-gray-300 md:w-96",
                    {
                      "border-primary placeholder:text-gray-400":
                        bgMode === "light",
                    },
                  )}
                />
              </FormControl>
              <FormMessage className="absolute -bottom-8" />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          variant="default"
          disabled={subscribe.isPending}
          className={cn(
            "text-primary h-12 w-auto min-w-36 space-x-2 bg-white px-4 py-2",
            {
              "bg-primary text-white": bgMode === "light",
            },
          )}
        >
          {subscribe.isPending && (
            <Loader className="mr-2 size-4 animate-spin" />
          )}{" "}
          {showDone && <CircleCheckBig className="animate-ease mr-2 size-4" />}{" "}
          {showDone ? "Subscribed!" : "Subscribe"}
        </Button>
      </form>
    </Form>
  );
}

export default SubscriptionForm;
