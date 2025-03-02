import { z } from "zod";

// Subscription schema
export const subscriptionSchema = z.object({
  email: z.string({ message: "Your email is required." }).email(),
});

export type SubscriptionType = z.infer<typeof subscriptionSchema>;
