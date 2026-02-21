import { userDocs } from '@/db/schema'
import { env } from '@/env'
import { MODELS } from '@/lib/llm'
import { TRPCError } from '@trpc/server'
import { streamText } from 'ai'
import { eq } from 'drizzle-orm'
import { z } from 'zod'
import { put, del } from '@vercel/blob'
import { createTRPCRouter, protectedProcedure } from '../trpc'

export const fileRouter = createTRPCRouter({
   upload: protectedProcedure
      .input(
         z.object({
            fileName: z.string(),
            contentType: z.string(),
            base64Data: z.string(),
         }),
      )
      .mutation(async ({ input, ctx }) => {
         try {
            const buffer = Buffer.from(input.base64Data, 'base64')
            const PATH = `docs/${ctx.userId}/${input.fileName}`

            const blob = await put(PATH, buffer, {
               access: 'public',
               contentType: input.contentType,
               token: env.BLOB_READ_WRITE_TOKEN,
               addRandomSuffix: true,
            })

            const file = await ctx.db
               .insert(userDocs)
               .values({
                  userId: ctx.userId,
                  fileName: input.fileName,
                  fileUrl: blob.url,
                  pathname: blob.pathname,
                  size: buffer.length.toString(),
                  mimeType: input.contentType,
               })
               .returning()

            return { id: file[0]?.id }
         } catch (error) {
            throw new TRPCError({
               code: 'INTERNAL_SERVER_ERROR',
               message: 'Failed to upload file',
               cause: error,
            })
         }
      }),

   llmProcess: protectedProcedure.input(z.object({ fileId: z.string(), prompt: z.string(), model: z.enum(['FAST', 'SENSITIVE', 'COMPLEX']) })).subscription(async function* ({ input, signal, ctx }) {
      const modelID = MODELS[input.model]

      const result = streamText({
         model: ctx.openrouter.chat(modelID),
         prompt: input.prompt,
         abortSignal: signal,
      })

      for await (const chunk of result.textStream) {
         yield { text: chunk }
      }
   }),

   delete: protectedProcedure.input(z.object({ fileId: z.string({ message: 'File ID is required' }).min(1) })).mutation(async ({ input, ctx }) => {
      try {
         const file = await ctx.db.query.userDocs.findFirst({
            where: eq(userDocs.id, input.fileId),
         })

         if (!file || file.userId !== ctx.userId) {
            throw new TRPCError({
               code: 'NOT_FOUND',
               message: 'File not found',
            })
         }

         await del(file.fileUrl, { token: env.BLOB_READ_WRITE_TOKEN })
         await ctx.db.delete(userDocs).where(eq(userDocs.id, input.fileId))

         return { success: true }
      } catch (error) {
         throw new TRPCError({
            code: 'INTERNAL_SERVER_ERROR',
            message: 'Failed to delete file',
            cause: error,
         })
      }
   }),
})
