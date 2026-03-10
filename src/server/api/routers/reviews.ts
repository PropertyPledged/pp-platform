import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "@/server/api/trpc";
import { reviewsTable, propertiesTable } from "@/db/schema";
import { eq, desc } from "drizzle-orm";

export const reviewsRouter = createTRPCRouter({
  create: protectedProcedure
    .input(z.object({
      propertyId: z.string().uuid(),
      content: z.string().min(10),
      rating: z.number().min(1).max(5),
      evidenceUrl: z.string().optional(),
      stayStartDate: z.date().optional(),
      stayEndDate: z.date().optional(),
    }))
    .mutation(async ({ input, ctx }) => {
      const { propertyId, content, rating, evidenceUrl, stayStartDate, stayEndDate } = input;
      const userId = ctx.userId;

      // Fetch the internal user ID from the usersTable using clerkId
      const user = await ctx.db.query.usersTable.findFirst({
        where: (users, { eq }) => eq(users.clerkId, userId),
      });

      if (!user) {
        throw new Error("User not found");
      }

      const [review] = await ctx.db
        .insert(reviewsTable)
        .values({
          userId: user.id,
          propertyId,
          content,
          rating,
          evidenceUrl,
          isVerified: !!evidenceUrl, // Set isVerified based on presence of evidence
          stayStartDate,
          stayEndDate,
        })
        .returning();

      return review;
    }),

  getByPropertyId: publicProcedure
    .input(z.object({ propertyId: z.string().uuid() }))
    .query(async ({ input, ctx }) => {
      return await ctx.db.query.reviewsTable.findMany({
        where: eq(reviewsTable.propertyId, input.propertyId),
        with: {
          user: true,
        },
        orderBy: [desc(reviewsTable.createdAt)],
      });
    }),
});
