import { usersTable } from "@/db/schema";
import { env } from "@/env";
import { db } from "@/server/db";
import { type WebhookEvent } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { Webhook } from "svix";
import { headers } from "next/headers";

export async function POST(req: Request) {
  const headerPayload = await headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error occured -- no svix headers", {
      status: 400,
    });
  }

  // Get the body
  const body = await req.text();

  // Create a new Svix instance with your secret.
  const wh = new Webhook(env.WEBHOOK_SECRET);

  let evt: WebhookEvent;

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error occured", {
      status: 400,
    });
  }

  // Get the ID and type
  const eventType = evt.type;

  if (eventType === "user.created") {
    const { id, email_addresses, primary_email_address_id } = evt.data;

    const email = email_addresses.find(
      (email) => email.id === primary_email_address_id,
    )?.email_address;

    if (!email) {
      return new Response("Error occured -- no email", {
        status: 400,
      });
    }

    await db.insert(usersTable).values({
      clerkId: id,
      email: email,
      isOnboarded: false,
    });
  }

  if (eventType === "user.updated") {
    const { id, email_addresses, primary_email_address_id } = evt.data;

    const email = email_addresses.find(
      (email) => email.id === primary_email_address_id,
    )?.email_address;

    if (!email) {
      return new Response("Error occured -- no email", {
        status: 400,
      });
    }

    await db
      .update(usersTable)
      .set({
        clerkId: id,
        email: email,
      })
      .where(eq(usersTable.clerkId, id));
  }

  if (eventType === "user.deleted") {
    const { id } = evt.data;

    if (!id) {
      return new Response("Error occured -- no id", {
        status: 400,
      });
    }

    await db.delete(usersTable).where(eq(usersTable.clerkId, id));
  }

  return new Response("", { status: 200 });
}
