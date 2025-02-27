"use server";

import WelcomeEmail from "@/components/templates/WelcomeEmail";
import { env } from "@/env";
import { resend } from "@/lib/resend";
import { adminClient } from "@/sanity/lib/adminClient";

type DataType = {
  id: string; // the suggestion category id
  name: string;
  email: string;
  value: {
    question: string;
    response: string;
    createdAt: Date;
  }[];
};

export const createResponse = async (data: DataType) => {
  for (const response of data.value) {
    adminClient
      .patch(data.id)
      .setIfMissing({ responses: [] })
      .append("responses", [
        { name: data.name, email: data.email, ...response },
      ])
      .commit({ autoGenerateArrayKeys: true })
      .then(async () => {
        const { data: list, error } = await resend.contacts.list({
          audienceId: env.RESEND_AUDIENCE_ID ?? "",
        });

        if (error) return;

        const contact = list?.data?.find(
          (contact) => contact.email === data?.email,
        );

        const names = data.name.split(" ");
        // user is already in the mailing list
        if (contact?.id) {
          // update the name
          if (!contact.first_name || !contact.last_name) {
            await resend.contacts.update({
              id: contact.id,
              firstName: names[0] ?? "",
              lastName: names[names.length - 1] ?? "", // last name
              audienceId: env.RESEND_AUDIENCE_ID ?? "",
            });
          }

          return;
        }

        await resend.contacts.create({
          email: data.email,
          firstName: names[0] ?? "",
          lastName: names[names.length - 1] ?? "", // last name
          audienceId: env.RESEND_AUDIENCE_ID ?? "",
        });

        // send subcription email
        await resend.emails.send({
          to: [data.email],
          from: "Property Pledged <hello@propertypledged.com>",
          subject: `Welcome to Property Pledged!`,
          text: `Thank you for subscribing to Property Pledged!`,
          react: WelcomeEmail({
            user: { name: data.name, email: data.email },
          }),
        });
      })
      .catch((reason) => {
        throw reason;
      });
  }
};

// send suggestion confirmation email and add user to mailing list
