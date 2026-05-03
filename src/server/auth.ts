import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";

import { env } from "@/env";
import { db } from "@/server/db";
import * as schema from "@/server/db/schema";

const socialProviders: Record<string, any> = {};

if (env.GOOGLE_CLIENT_ID && env.GOOGLE_CLIENT_SECRET) {
  socialProviders.google = {
    clientId: env.GOOGLE_CLIENT_ID,
    clientSecret: env.GOOGLE_CLIENT_SECRET,
    redirectURL: `${env.BETTER_AUTH_URL}/api/auth/callback/google`,
  };
}

if (env.APPLE_CLIENT_ID && env.APPLE_CLIENT_SECRET) {
  socialProviders.apple = {
    clientId: env.APPLE_CLIENT_ID,
    clientSecret: env.APPLE_CLIENT_SECRET,
    redirectURL: `${env.BETTER_AUTH_URL}/api/auth/callback/apple`,
  };
}

if (env.GITHUB_CLIENT_ID && env.GITHUB_CLIENT_SECRET) {
  socialProviders.github = {
    clientId: env.GITHUB_CLIENT_ID,
    clientSecret: env.GITHUB_CLIENT_SECRET,
    redirectURL: `${env.BETTER_AUTH_URL}/api/auth/callback/github`,
  };
}

export const auth = betterAuth({
  baseURL: env.BETTER_AUTH_URL,
  basePath: "/api/auth",
  secret: env.BETTER_AUTH_SECRET,
  appName: "Property Pledge",
  database: drizzleAdapter(db, {
    provider: "pg",
    schema,
    usePlural: true,
  }),
  plugins: [nextCookies()],
  user: {
    additionalFields: {
      onboarded: {
        type: "boolean",
        input: false,
      },
    },
    changeEmail: {
      enabled: true,
    },
    deleteUser: {
      enabled: true,
    },
  },
  ...(Object.keys(socialProviders).length > 0 && { socialProviders }),
  emailAndPassword: {
    enabled: true,
    sendResetPasswordEmail: async (params: { user: { email: string }; url: string }) => {
      const { user, url } = params;
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${env.RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: "noreply@propertypledge.com",
          to: user.email,
          subject: "Reset your Property Pledge password",
          html: `
            <h1>Reset your password</h1>
            <p>Click the link below to reset your password:</p>
            <a href="${url}">Reset Password</a>
          `,
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to send reset password email");
      }
    },
  },
  emailVerification: {
    autoConfirmEmail: false,
    sendVerificationEmail: async (params: { user: { email: string }; url: string }) => {
      const { user, url } = params;
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${env.RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: "noreply@propertypledge.com",
          to: user.email,
          subject: "Verify your email - Property Pledge",
          html: `
            <h1>Verify your email</h1>
            <p>Click the link below to verify your email:</p>
            <a href="${url}">Verify Email</a>
          `,
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to send verification email");
      }
    },
  },
});
