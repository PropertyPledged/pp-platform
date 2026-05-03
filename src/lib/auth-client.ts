"use client";

import { createAuthClient } from "better-auth/react";
import { inferAdditionalFields } from "better-auth/client/plugins";

export const authClient = createAuthClient({
  baseURL: typeof window !== "undefined" ? window.location.origin : undefined,
  basePath: "/api/auth",
  plugins: [
    inferAdditionalFields({
      user: {
        onboarded: {
          type: "boolean",
          required: false,
        },
        role: {
          type: "string",
          required: false,
        },
        phoneNumber: {
          type: "string",
          required: false,
        },
      },
    }),
  ],
});

export const { signUp, signIn, signOut, useSession, changeEmail, deleteUser, verifyEmail } = authClient;
