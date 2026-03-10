import { z } from "zod";

export const reviewSchema = z.object({
  propertyId: z.string().uuid("Invalid property ID"),
  content: z.string().min(10, "Review must be at least 10 characters"),
  rating: z.number().min(1).max(5),
  evidenceUrl: z.string().optional(),
  stayStartDate: z.date().optional(),
  stayEndDate: z.date().optional(),
});

export type ReviewType = z.infer<typeof reviewSchema>;
