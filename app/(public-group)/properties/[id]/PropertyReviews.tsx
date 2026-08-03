
"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Loader2,
  MessageSquare,
  Send,
  Star,
} from "lucide-react";
import { toast } from "sonner";

import {
  createReview,
  getAllReviews,
  type Review,
} from "@/service/review.service";

import { ReviewPagination } from "@/components/Home/ReviewPagination";

interface PropertyReviewsProps {
  propertyId: string;
}

const REVIEWS_PER_PAGE = 5;

const PropertyReviews = ({
  propertyId,
}: PropertyReviewsProps) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [error, setError] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getAllReviews();

        setReviews(data);
        setCurrentPage(1);
      } catch (error) {
        console.error(
          "Failed to fetch reviews:",
          error,
        );

        setError(
          error instanceof Error
            ? error.message
            : "Failed to load reviews",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  const propertyReviews = useMemo(() => {
    return reviews.filter(
      (review) => review.propertyId === propertyId,
    );
  }, [reviews, propertyId]);

  const averageRating = useMemo(() => {
    if (propertyReviews.length === 0) {
      return 0;
    }

    const total = propertyReviews.reduce(
      (sum, review) => sum + review.rating,
      0,
    );

    return total / propertyReviews.length;
  }, [propertyReviews]);

  /*
   * Pagination
   */
  const totalPages = Math.ceil(
    propertyReviews.length / REVIEWS_PER_PAGE,
  );

  const startIndex =
    (currentPage - 1) * REVIEWS_PER_PAGE;

  const currentReviews = propertyReviews.slice(
    startIndex,
    startIndex + REVIEWS_PER_PAGE,
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);

    document
      .getElementById("property-reviews")
      ?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
  };

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    if (rating === 0) {
      toast.error("Please select a rating.");
      return;
    }

    if (!comment.trim()) {
      toast.error("Please write a review.");
      return;
    }

    try {
      setSubmitting(true);

      const newReview = await createReview({
        rating,
        comment: comment.trim(),
        propertyId,
      });

      setReviews((currentReviews) => [
        newReview,
        ...currentReviews,
      ]);

      setRating(0);
      setHoverRating(0);
      setComment("");

      // New review will be visible on first page
      setCurrentPage(1);

      toast.success(
        "Review submitted successfully.",
      );
    } catch (error) {
      console.error(
        "Failed to submit review:",
        error,
      );

      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to submit review.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      id="property-reviews"
      className="mt-10 border-t border-border pt-10"
    >
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <MessageSquare className="size-5 text-primary" />

            <h2 className="text-xl font-bold">
              Reviews
            </h2>
          </div>

          <p className="mt-2 text-sm text-muted-foreground">
            See what tenants think about this property.
          </p>
        </div>

        {propertyReviews.length > 0 && (
          <div className="flex items-center gap-2">
            <Star className="size-5 fill-primary text-primary" />

            <span className="font-bold">
              {averageRating.toFixed(1)}
            </span>

            <span className="text-sm text-muted-foreground">
              ({propertyReviews.length}{" "}
              {propertyReviews.length === 1
                ? "review"
                : "reviews"}
              )
            </span>
          </div>
        )}
      </div>

      {/* Review Form */}
      <div className="mt-6 rounded-2xl border border-border bg-card p-5 sm:p-6">
        <h3 className="font-bold">
          Share your experience
        </h3>

        <form
          onSubmit={handleSubmit}
          className="mt-5 space-y-5"
        >
          {/* Rating */}
          <div>
            <p className="mb-2 text-sm font-semibold">
              Your rating
            </p>

            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map(
                (_, index) => {
                  const starNumber = index + 1;

                  const activeRating =
                    hoverRating || rating;

                  return (
                    <button
                      key={starNumber}
                      type="button"
                      onClick={() =>
                        setRating(starNumber)
                      }
                      onMouseEnter={() =>
                        setHoverRating(starNumber)
                      }
                      onMouseLeave={() =>
                        setHoverRating(0)
                      }
                      className="rounded-md p-1 transition hover:scale-110"
                      aria-label={`Rate ${starNumber} out of 5`}
                    >
                      <Star
                        className={`size-6 transition ${
                          starNumber <= activeRating
                            ? "fill-primary text-primary"
                            : "text-muted-foreground"
                        }`}
                      />
                    </button>
                  );
                },
              )}
            </div>
          </div>

          {/* Comment */}
          <div>
            <label
              htmlFor="review-comment"
              className="mb-2 block text-sm font-semibold"
            >
              Your review
            </label>

            <textarea
              id="review-comment"
              value={comment}
              onChange={(event) =>
                setComment(event.target.value)
              }
              placeholder="Tell us about your experience with this property..."
              rows={4}
              className="w-full resize-none rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition placeholder:text-muted-foreground focus:border-primary"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={submitting}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-primary px-5 text-sm font-bold text-primary-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting ? (
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
        </form>
      </div>

      {/* Reviews */}
      <div className="mt-8">
        {loading ? (
          <div className="flex items-center justify-center rounded-2xl border border-border bg-card p-8">
            <Loader2 className="size-6 animate-spin text-primary" />
          </div>
        ) : error ? (
          <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-6 text-center">
            <p className="text-sm text-red-500">
              {error}
            </p>
          </div>
        ) : propertyReviews.length === 0 ? (
          <div className="rounded-2xl border border-border bg-card p-8 text-center">
            <MessageSquare className="mx-auto size-8 text-muted-foreground" />

            <p className="mt-3 font-semibold">
              No reviews yet
            </p>

            <p className="mt-1 text-sm text-muted-foreground">
              Be the first tenant to review this property.
            </p>
          </div>
        ) : (
          <>
            <div className="space-y-4">
              {currentReviews.map((review) => (
                <article
                  key={review.id}
                  className="rounded-2xl border border-border bg-card p-5 sm:p-6"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-primary/15 text-sm font-bold text-primary">
                        {review.tenant.name
                          .split(" ")
                          .map((name) => name[0])
                          .join("")
                          .slice(0, 2)
                          .toUpperCase()}
                      </div>

                      <div className="min-w-0">
                        <p className="truncate font-bold">
                          {review.tenant.name}
                        </p>

                        <p className="text-xs text-muted-foreground">
                          {new Date(
                            review.createdAt,
                          ).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    <div className="flex shrink-0 gap-0.5">
                      {Array.from({ length: 5 }).map(
                        (_, index) => (
                          <Star
                            key={index}
                            className={`size-4 ${
                              index < review.rating
                                ? "fill-primary text-primary"
                                : "text-muted-foreground"
                            }`}
                          />
                        ),
                      )}
                    </div>
                  </div>

                  <p className="mt-4 text-sm leading-7 text-muted-foreground">
                    {review.comment}
                  </p>
                </article>
              ))}
            </div>

            {/* Pagination */}
            <ReviewPagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </>
        )}
      </div>
    </section>
  );
};

export default PropertyReviews;

