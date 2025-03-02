import { WelcomeEmail } from "@/components/templates/WelcomeEmail";
import { env } from "@/env";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { z } from "zod";

export const subscriptionRouter = createTRPCRouter({
  subscribe: publicProcedure
    .input(z.object({ email: z.string() }))
    .mutation(async ({ input, ctx }) => {
      try {
        const { data } = await ctx.resend.contacts.create({
          ...input,
          audienceId: env.RESEND_AUDIENCE_ID ?? "",
        });

        if (data?.id) {
          await ctx.resend.emails.send({
            to: [input.email],
            from: "Property Pledged <hello@propertypledged.com>",
            subject: `Welcome to Property Pledged!`,
            text: `Thank you for subscribing to Property Pledged!`,
            react: WelcomeEmail({
              user: { name: "", email: input.email },
            }),
          });

          return { ...data, ...input };
        }
      } catch (error) {
        throw error;
      }
    }),
});
