"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "@/trpc/react";
import { toast } from "sonner";
import { UploadDropzone } from "@/lib/uploadthing";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage,
  FormDescription
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { reviewSchema, type ReviewType } from "@/schemas/reviewSchema";
import { cn } from "@/lib/utils";

interface ReviewFormProps {
  propertyId: string;
  onSuccess?: () => void;
}

export function ReviewForm({ propertyId, onSuccess }: ReviewFormProps) {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);

  const form = useForm<ReviewType>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      propertyId,
      content: "",
      rating: 0,
      evidenceUrl: "",
    },
  });

  const createReview = api.reviews.create.useMutation({
    onSuccess: () => {
      toast.success("Review submitted successfully!");
      form.reset();
      setRating(0);
      if (onSuccess) onSuccess();
    },
    onError: (error) => {
      toast.error(error.message || "Failed to submit review");
    },
  });

  const onSubmit = (data: ReviewType) => {
    if (data.rating === 0) {
      toast.error("Please select a rating");
      return;
    }
    createReview.mutate(data);
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-sm border border-gray-100">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="rating"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-semibold text-gray-900">How was your stay?</FormLabel>
                  <FormControl>
                    <div className="flex gap-2 py-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          className="focus:outline-none transition-transform hover:scale-110"
                          onMouseEnter={() => setHoveredRating(star)}
                          onMouseLeave={() => setHoveredRating(0)}
                          onClick={() => {
                            setRating(star);
                            field.onChange(star);
                          }}
                        >
                          <Star
                            className={cn(
                              "w-8 h-8 transition-colors",
                              (hoveredRating || rating) >= star
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-gray-300"
                            )}
                          />
                        </button>
                      ))}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-medium text-gray-700">Your Review</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Share your experience (at least 10 characters)..."
                      className="min-h-[120px] resize-none focus:ring-primary"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="evidenceUrl"
              render={({ field }) => (
                <FormItem className="pt-4 border-t border-gray-100">
                  <div className="space-y-1">
                    <FormLabel className="text-base font-semibold text-gray-900 flex items-center gap-2">
                      Get Verified Resident Badge
                      <span className="text-xs font-normal text-primary bg-primary/10 px-2 py-0.5 rounded-full">Recommended</span>
                    </FormLabel>
                    <FormDescription className="text-sm text-gray-500">
                      Upload proof of your stay (e.g., tenancy agreement, utility bill) to get verified. 
                      Your documents are only used for verification and never shared.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <div className="mt-4">
                      {field.value ? (
                        <div className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                              <span className="text-green-600 font-bold">✓</span>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-green-900">Evidence Uploaded</p>
                              <p className="text-xs text-green-700">Your review will be marked as verified.</p>
                            </div>
                          </div>
                          <Button 
                            type="button" 
                            variant="ghost" 
                            size="sm" 
                            className="text-red-500 hover:text-red-700 hover:bg-red-50"
                            onClick={() => field.onChange("")}
                          >
                            Remove
                          </Button>
                        </div>
                      ) : (
                        <UploadDropzone
                          endpoint="residencyProof"
                          onClientUploadComplete={(res) => {
                            if (res?.[0]) {
                              field.onChange(res[0].url);
                              toast.success("Evidence uploaded successfully!");
                            }
                          }}
                          onUploadError={(error: Error) => {
                            toast.error(`Upload failed: ${error.message}`);
                          }}
                          className="ut-label:text-primary ut-button:bg-primary ut-button:ut-readying:bg-primary/50 border-2 border-dashed border-gray-200 hover:border-primary/50 transition-colors"
                        />
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button
            type="submit"
            disabled={createReview.isPending}
            className="w-full py-6 text-lg font-semibold bg-primary hover:bg-primary/90 transition-all shadow-md active:scale-[0.98]"
          >
            {createReview.isPending ? "Submitting..." : "Submit Review"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
