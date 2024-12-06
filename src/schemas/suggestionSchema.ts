import { z } from 'zod'

export const suggestionSchema = z.object({
    name: z.string({ message: 'Your name is required.' }).min(1),
    email: z.string({ message: 'Your email is required.' }).email(),
    feedback: z.array(
        z.object({
            category: z.string({ message: 'Category is required.' }).min(1),
            message: z.string({ message: 'Message is required.' }).min(1),
        }),
    ),
})

export type SuggestionType = z.infer<typeof suggestionSchema>
