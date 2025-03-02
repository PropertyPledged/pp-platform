import { z } from "zod";

export const suggestionSchema = z.object({
  name: z
    .string({ message: "Your name is required." })
    .min(1, { message: "Your name is required." }),
  email: z
    .string({ message: "Your email is required." })
    .email({ message: "Invalid email address" }),
  responses: z
    .record(
      z.string(),
      z
        .array(
          z.object({
            question: z.string().min(1, { message: "Question is required. " }),
            response: z.string().min(1, { message: "Response is required. " }),
            createdAt: z.date().default(new Date()),
          }),
        )
        .default([]),
    )
    .refine((record) => {
      for (const rec of Object.values(record)) {
        return rec.length > 0;
      }
    }, "Atleast one suggestion is required."),
});

export const responseSchema = z.object({
  id: z.string(),
  name: z.string({ message: "Users fullname is required" }),
  email: z
    .string({ message: "Users email is required" })
    .email("Invalid email"),
  responses: z
    .array(
      z.object({
        question: z.string(),
        response: z.string({ message: "Response is required" }),
        createdAt: z.date(),
      }),
    )
    .default([]),
});

export type SuggestionType = z.infer<typeof suggestionSchema>;
