"use client";

import { useEffect, useState } from "react";
import {
  Loader2,
  MapPin,
  MessageSquare,
  Star,
  Trash2,
  User,
  X,
} from "lucide-react";
import { toast } from "sonner";

import {
  adminDeleteReview,
  getAdminReviews,
  type Review,
} from "@/service/review.service";

const ReviewsPage = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [deletingId, setDeletingId] = useState<string | null>(
    null,
  );

  const [deleteReview, setDeleteReview] =
    useState<Review | null>(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getAdminReviews();

        setReviews(data);
      } catch (error) {
        console.error(
          "Failed to fetch admin reviews:",
          error,
        );

        setError(
          error instanceof Error
            ? error.message
            : "Failed to load reviews.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  const handleDelete = async () => {
    if (!deleteReview) return;

    try {
      setDeletingId(deleteReview.id);

      await adminDeleteReview(deleteReview.id);

      setReviews((currentReviews) =>
        currentReviews.filter(
          (review) => review.id !== deleteReview.id,
        ),
      );

      toast.success("Review deleted successfully.");

      setDeleteReview(null);
    } catch (error) {
      console.error(
        "Failed to delete review:",
        error,
      );

      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to delete review.",
      );
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <MessageSquare className="size-6 text-primary" />

              <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
                Reviews
              </h1>
            </div>

            <p className="mt-2 text-sm text-muted-foreground">
              Manage reviews submitted by tenants.
            </p>
          </div>

          {!loading && !error && (
            <div className="rounded-xl border border-border bg-card px-4 py-2">
              <span className="text-sm text-muted-foreground">
                Total Reviews
              </span>

              <span className="ml-2 font-bold">
                {reviews.length}
              </span>
            </div>
          )}
        </div>

        {/* Loading */}
        {loading && (
          <div className="mt-8 flex min-h-64 items-center justify-center rounded-2xl border border-border bg-card">
            <div className="flex flex-col items-center gap-3">
              <Loader2 className="size-7 animate-spin text-primary" />

              <p className="text-sm text-muted-foreground">
                Loading reviews...
              </p>
            </div>
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="mt-8 rounded-2xl border border-red-500/20 bg-red-500/5 p-8 text-center">
            <MessageSquare className="mx-auto size-10 text-red-500/60" />

            <h2 className="mt-3 font-bold text-red-500">
              Failed to load reviews
            </h2>

            <p className="mt-2 text-sm text-muted-foreground">
              {error}
            </p>
          </div>
        )}

        {/* Empty */}
        {!loading &&
          !error &&
          reviews.length === 0 && (
            <div className="mt-8 rounded-2xl border border-border bg-card p-10 text-center">
              <MessageSquare className="mx-auto size-12 text-muted-foreground/50" />

              <h2 className="mt-4 text-lg font-bold">
                No reviews found
              </h2>

              <p className="mt-2 text-sm text-muted-foreground">
                There are no reviews available yet.
              </p>
            </div>
          )}

        {/* Reviews */}
        {!loading &&
          !error &&
          reviews.length > 0 && (
            <div className="mt-8 grid gap-5 lg:grid-cols-2">
              {reviews.map((review) => (
                <article
                  key={review.id}
                  className="rounded-2xl border border-border bg-card p-5 transition hover:shadow-sm sm:p-6"
                >
                  {/* Top */}
                  <div className="flex items-start justify-between gap-4">
                    {/* Tenant */}
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-primary/10">
                        <User className="size-5 text-primary" />
                      </div>

                      <div className="min-w-0">
                        <h2 className="truncate font-bold">
                          {review.tenant.name}
                        </h2>

                        {review.tenant.email && (
                          <p className="truncate text-sm text-muted-foreground">
                            {review.tenant.email}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Delete */}
                    <button
                      type="button"
                      onClick={() =>
                        setDeleteReview(review)
                      }
                      disabled={
                        deletingId === review.id
                      }
                      className="inline-flex size-9 shrink-0 items-center justify-center rounded-lg border border-border text-muted-foreground transition hover:border-red-500 hover:bg-red-500/5 hover:text-red-500 disabled:cursor-not-allowed disabled:opacity-50"
                      aria-label="Delete review"
                    >
                      {deletingId === review.id ? (
                        <Loader2 className="size-4 animate-spin" />
                      ) : (
                        <Trash2 className="size-4" />
                      )}
                    </button>
                  </div>

                  {/* Rating */}
                  <div className="mt-5 flex items-center gap-1">
                    {Array.from({ length: 5 }).map(
                      (_, index) => (
                        <Star
                          key={index}
                          className={`size-5 ${
                            index < review.rating
                              ? "fill-primary text-primary"
                              : "text-muted-foreground"
                          }`}
                        />
                      ),
                    )}

                    <span className="ml-2 text-sm font-semibold">
                      {review.rating}/5
                    </span>
                  </div>

                  {/* Comment */}
                  <div className="mt-5 rounded-xl bg-muted/40 p-4">
                    <p className="text-sm leading-7 text-foreground">
                      “{review.comment}”
                    </p>
                  </div>

                  {/* Property */}
                  <div className="mt-5 rounded-xl border border-border p-4">
                    <div className="flex items-start gap-3">
                      <MessageSquare className="mt-0.5 size-5 shrink-0 text-primary" />

                      <div className="min-w-0">
                        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                          Property
                        </p>

                        <p className="mt-1 truncate font-bold">
                          {review.property.title}
                        </p>

                        <div className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
                          <MapPin className="size-4 shrink-0 text-primary" />

                          <span className="truncate">
                            {review.property.location}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="mt-5 border-t border-border pt-4">
                    <p className="text-xs text-muted-foreground">
                      Reviewed on{" "}
                      {new Date(
                        review.createdAt,
                      ).toLocaleDateString()}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          )}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteReview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md overflow-hidden rounded-2xl border border-border bg-card shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-border p-5">
              <div>
                <h2 className="text-lg font-bold">
                  Delete Review
                </h2>

                <p className="mt-1 text-sm text-muted-foreground">
                  This action cannot be undone.
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  setDeleteReview(null)
                }
                disabled={Boolean(deletingId)}
                className="flex size-9 items-center justify-center rounded-lg text-muted-foreground transition hover:bg-muted hover:text-foreground disabled:cursor-not-allowed disabled:opacity-50"
                aria-label="Close delete modal"
              >
                <X className="size-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-5">
              <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-4">
                <p className="text-sm leading-6">
                  Are you sure you want to delete the review
                  submitted by{" "}
                  <span className="font-bold">
                    {deleteReview.tenant.name}
                  </span>
                  ?
                </p>

                <p className="mt-2 text-sm text-muted-foreground">
                  This review will be permanently removed.
                </p>
              </div>

              {/* Buttons */}
              <div className="mt-5 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() =>
                    setDeleteReview(null)
                  }
                  disabled={Boolean(deletingId)}
                  className="h-11 rounded-xl border border-border px-5 text-sm font-semibold transition hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={handleDelete}
                  disabled={Boolean(deletingId)}
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-red-500 px-5 text-sm font-bold text-white transition hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {deletingId ? (
                    <>
                      <Loader2 className="size-4 animate-spin" />
                      Deleting...
                    </>
                  ) : (
                    <>
                      <Trash2 className="size-4" />
                      Delete Review
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default ReviewsPage;