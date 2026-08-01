"use client";

import { FormEvent, useState } from "react";
import {
  Loader2,
  Send,
  Star,
} from "lucide-react";
import { toast } from "sonner";

import {
  createReview,
  CreateReviewData,
  Review,
} from "@/service/review.service";

interface ReviewFormProps {
  propertyId: string;
  onReviewCreated?: (review: Review) => void;
}

const ReviewForm = ({
  propertyId,
  onReviewCreated,
}: ReviewFormProps) => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    if (loading) return;



    if (!propertyId) {
      toast.error("Property information is missing.");
      return;
    }

    if (rating === 0) {
      toast.error("Please select a rating.");
      return;
    }

    if (!comment.trim()) {
      toast.error("Please write a review.");
      return;
    }

    try {
      setLoading(true);

      const payload: CreateReviewData = {
        rating,
        comment: comment.trim(),
        propertyId,
      };


      const review = await createReview(payload);

    

      onReviewCreated?.(review);

 

      setRating(0);
      setHoverRating(0);
      setComment("");


      toast.success("Review created successfully!");
    } catch (error) {
      console.error("Create review error:", error);

      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to create review",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-3xl border border-border/60 bg-card shadow-sm">


      <div className="border-b border-border/60 px-5 py-5 sm:px-7">
        <h2 className="text-lg font-bold">
          Write a Review
        </h2>

        <p className="mt-1 text-sm text-muted-foreground">
          Share your experience about this property.
        </p>
      </div>


      <form
        onSubmit={handleSubmit}
        className="space-y-6 p-5 sm:p-7"
      >
     

        <div>
          <label className="mb-3 block text-sm font-semibold">
            Your Rating
          </label>

          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => {
              const activeRating =
                hoverRating || rating;

              return (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() =>
                    setHoverRating(star)
                  }
                  onMouseLeave={() =>
                    setHoverRating(0)
                  }
                  disabled={loading}
                  aria-label={`Rate ${star} out of 5`}
                  className="rounded-lg p-1 transition hover:scale-110 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <Star
                    className={`size-7 transition ${
                      star <= activeRating
                        ? "fill-primary text-primary"
                        : "text-muted-foreground/40"
                    }`}
                  />
                </button>
              );
            })}

            {rating > 0 && (
              <span className="ml-2 text-sm font-medium text-muted-foreground">
                {rating}/5
              </span>
            )}
          </div>
        </div>


        <div>
          <label
            htmlFor="review-comment"
            className="mb-2 block text-sm font-semibold"
          >
            Your Review
          </label>

          <textarea
            id="review-comment"
            value={comment}
            onChange={(event) =>
              setComment(event.target.value)
            }
            placeholder="Tell us about your experience..."
            rows={5}
            disabled={loading}
            className="w-full resize-none rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10 disabled:cursor-not-allowed disabled:opacity-60"
          />

          <p className="mt-1.5 text-xs text-muted-foreground">
            {comment.length} characters
          </p>
        </div>


        <div className="flex justify-end border-t border-border/60 pt-5">
          <button
            type="submit"
            disabled={loading}
            className="flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-bold text-primary-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                <Send className="size-4" />
                Submit Review
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReviewForm;