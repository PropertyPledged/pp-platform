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
});
