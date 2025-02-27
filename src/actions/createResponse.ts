"use server";

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

        if (contact) return; // user is already in the mailing list

        await resend.contacts.create({
          email: data.email,
          audienceId: env.RESEND_AUDIENCE_ID ?? "",
        });

        // send subcription email
      })
      .catch((reason) => {
        throw reason;
      });
  }
};

// send suggestion confirmation email and add user to mailing list
