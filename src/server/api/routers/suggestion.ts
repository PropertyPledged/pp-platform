import { WelcomeEmail } from "@/components/templates/WelcomeEmail";
import { env } from "@/env";
import { adminClient } from "@/sanity/lib/adminClient";
import { suggestionSchema } from "@/schemas/suggestionSchema";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const suggestionRouter = createTRPCRouter({
  respond: publicProcedure
    .input(suggestionSchema)
    .mutation(async ({ input, ctx }) => {
      const { responses: suggestions, ...rest } = input;
      for (const [id, responses] of Object.entries(suggestions)) {
        for (const response of responses) {
          await adminClient
            .patch(id)
            .setIfMissing({ responses: [] })
            .append("responses", [{ ...rest, ...response }])
            .commit({ autoGenerateArrayKeys: true })
            .then(async () => {
              // get all the contacts
              const { data: list, error } = await ctx.resend.contacts.list({
                audienceId: env.RESEND_AUDIENCE_ID ?? "",
              });
              if (error) throw new Error(error.message, { cause: error });

              const contact = list?.data?.find(
                (contact) => contact.email === rest.email,
              );

              const names = rest.name.split(" ");

              // user is already in the mailing list
              if (contact?.id) {
                // update the name
                if (!contact.first_name || !contact.last_name) {
                  await ctx.resend.contacts.update({
                    id: contact.id,
                    firstName: names[0] ?? "",
                    lastName: names[names.length - 1] ?? "", // last name even if the user has multiple names
                    audienceId: env.RESEND_AUDIENCE_ID ?? "",
                  });
                }
              } else {
                // create a new contact
                await ctx.resend.contacts.create({
                  email: rest.email,
                  firstName: names[0] ?? "",
                  lastName: names[names.length - 1] ?? "", // last name even if the user has multiple names
                  audienceId: env.RESEND_AUDIENCE_ID ?? "",
                });

                // send subscription email
                await ctx.resend.emails.send({
                  to: [rest.email],
                  from: "Property Pledged <hello@propertypledged.com>",
                  subject: `Welcome to Property Pledged!`,
                  text: `Thank you for subscribing to Property Pledged!`,
                  react: WelcomeEmail({
                    user: { name: rest.name, email: rest.email },
                  }),
                });
              }

              return true;
            });
        }
      }
    }),
});
