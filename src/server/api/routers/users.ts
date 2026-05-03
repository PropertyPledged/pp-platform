<<<<<<< HEAD
import { usersTable } from "@/db/schema";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { eq } from "drizzle-orm";
import { z } from "zod";

export const usersRouter = createTRPCRouter({
  me: protectedProcedure
    .input(z.string({ message: "Invalid clerkId" }).min(1))
    .query(async ({ ctx, input }) => {
      const user = await ctx.db.query.usersTable.findFirst({
        where: eq(usersTable.clerkId, input),
      });
      return user;
    }),
=======
import { z } from "zod";
import { createTRPCRouter, publicProcedure, protectedProcedure } from "@/server/api/trpc";
import { usersTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { WelcomeEmail } from "@/components/templates/WelcomeEmail";
import { clerkClient } from "@clerk/nextjs/server";

export const usersRouter = createTRPCRouter({
  sync: publicProcedure
    .input(z.object({
      clerkId: z.string(),
      email: z.string().email(),
      name: z.string().optional(),
    }))
    .mutation(async ({ input, ctx }) => {
      const { clerkId, email, name } = input;

      const [user] = await ctx.db
        .insert(usersTable)
        .values({
          clerkId,
          email,
          name,
          isOnboarded: false,
        })
        .onConflictDoUpdate({
          target: usersTable.clerkId,
          set: { email, name },
        })
        .returning();
      return user;
    }),

  completeOnboarding: protectedProcedure
    .input(z.object({
      displayName: z.string().min(3),
      avatarUrl: z.string().optional(),
      role: z.enum(["TENANT", "LANDLORD", "LEASEHOLDER", "MANAGER", "ADMIN"]),
    }))
    .mutation(async ({ input, ctx }) => {
      const { displayName, avatarUrl, role } = input;
      const clerkId = ctx.userId;

      const [user] = await ctx.db
        .update(usersTable)
        .set({
          displayName,
          avatarUrl,
          role: role as any,
          isOnboarded: true,
          updatedAt: new Date(),
        })
        .where(eq(usersTable.clerkId, clerkId))
        .returning();

      // Sync to Clerk publicMetadata for middleware efficiency
      const clerk = await clerkClient();
      const clerkUser = await clerk.users.updateUserMetadata(clerkId, {
        publicMetadata: {
          isOnboarded: true,
        },
      });

      console.log("Clerk user updated:", clerkUser);  

      if (user?.email) {
        await ctx.resend.emails.send({
          from: "Property Pledged <hello@propertypledged.com>",
          to: [user.email],
          subject: "Welcome to Property Pledged!",
          react: WelcomeEmail({
            user: {
              name: user.name ?? user.displayName ?? "Member",
              email: user.email,
            },
          }),
        });
      }

      return user;
    }),
    
  getByClerkId: publicProcedure
    .input(z.object({ clerkId: z.string() }))
    .query(async ({ input, ctx }) => {
      const [user] = await ctx.db
        .select()
        .from(usersTable)
        .where(eq(usersTable.clerkId, input.clerkId))
        .limit(1);
      return user || null;
    }),
>>>>>>> task/onboarding
});
