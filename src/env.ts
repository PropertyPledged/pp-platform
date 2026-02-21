import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const env = createEnv({
   server: {
      DATABASE_URL: z.string().url(),
      NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
      RESEND_API_KEY: z.string({ message: 'RESEND_API key required for emails' }).min(1, { message: 'RESEND_API key required for emails' }),
      RESEND_AUDIENCE_ID: z.string().optional(),
      SANITY_VIEWER_TOKEN: z.string({
         message: 'SANITY_VIEWR_TOKEN is required for sanity io',
      }),
      CLERK_SECRET_KEY: z.string({ message: 'CLERK SECRET KEY is required' }).min(1, { message: 'CLERK SECRET KEY is required' }),
      WEBHOOK_SECRET: z.string({ message: 'WEBHOOK_SECRET is required' }),
      BLOB_READ_WRITE_TOKEN: z.string().min(1, { message: 'BLOB_READ_WRITE_TOKEN is required' }),
      OPENROUTER_API_KEY: z.string().min(1, { message: 'OPENROUTER_API_KEY is required' }),
   },

   client: {
      NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string().optional(),
      NEXT_PUBLIC_GETADDRESS_IO_KEY: z.string().optional(),
   },

   runtimeEnv: {
      NODE_ENV: process.env.NODE_ENV,
      DATABASE_URL: process.env.DATABASE_URL,
      RESEND_API_KEY: process.env.RESEND_API_KEY,
      RESEND_AUDIENCE_ID: process.env.RESEND_AUDIENCE_ID,
      SANITY_VIEWER_TOKEN: process.env.SANITY_VIEWER_TOKEN,
      NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
      NEXT_PUBLIC_GETADDRESS_IO_KEY: process.env.NEXT_PUBLIC_GETADDRESS_IO_KEY,
      CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,
      WEBHOOK_SECRET: process.env.WEBHOOK_SECRET,
      BLOB_READ_WRITE_TOKEN: process.env.BLOB_READ_WRITE_TOKEN,
      OPENROUTER_API_KEY: process.env.OPENROUTER_API_KEY,
   },
   emptyStringAsUndefined: true,
})
