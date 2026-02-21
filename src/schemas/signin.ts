import { z } from 'zod'

// Subscription schema
export const signinSchema = z.object({
   email: z.string({ message: 'Your email is required.' }).email({ message: 'Invalid email address' }),
   password: z.string({ message: 'Your password is required.' }).min(8, { message: 'Password must be at least 8 characters' }),
})

export type SigninType = z.infer<typeof signinSchema>
