
"use client";

import { useEffect, useState } from "react";
import {
  AlertTriangle,
  Loader2,
  MapPin,
  MessageSquare,
  Pencil,
  Star,
  Trash2,
  X,
} from "lucide-react";
import { toast } from "sonner";

import {
  deleteReview,
  getMyReviews,
  updateReview,
  type Review,
} from "@/service/review.service";

const ReviewsPage = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Edit states
  const [editingReview, setEditingReview] =
    useState<Review | null>(null);

  const [editRating, setEditRating] = useState(0);
  const [editHoverRating, setEditHoverRating] =
    useState(0);
  const [editComment, setEditComment] = useState("");
  const [updating, setUpdating] = useState(false);

  // Delete states
  const [deletingReview, setDeletingReview] =
    useState<Review | null>(null);

  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getMyReviews();

        setReviews(data);
      } catch (error) {
        console.error(
          "Failed to fetch my reviews:",
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

  const handleOpenEdit = (review: Review) => {
    setEditingReview(review);
    setEditRating(review.rating);
    setEditHoverRating(0);
    setEditComment(review.comment);
  };

  const handleCloseEdit = () => {
    if (updating) return;

    setEditingReview(null);
    setEditRating(0);
    setEditHoverRating(0);
    setEditComment("");
  };

  const handleUpdate = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    if (!editingReview) return;

    if (editRating === 0) {
      toast.error("Please select a rating.");
      return;
    }

    if (!editComment.trim()) {
      toast.error("Please write a review.");
      return;
    }

    try {
      setUpdating(true);

      const updatedReview = await updateReview(
        editingReview.id,
        {
          rating: editRating,
          comment: editComment.trim(),
        },
      );

      setReviews((currentReviews) =>
        currentReviews.map((review) =>
          review.id === updatedReview.id
            ? updatedReview
            : review,
        ),
      );

      toast.success("Review updated successfully.");

      handleCloseEdit();
    } catch (error) {
      console.error(
        "Failed to update review:",
        error,
      );

      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to update review.",
      );
    } finally {
      setUpdating(false);
    }
  };

  const handleOpenDelete = (review: Review) => {
    setDeletingReview(review);
  };

  const handleCloseDelete = () => {
    if (deleting) return;

    setDeletingReview(null);
  };

  const handleDelete = async () => {
    if (!deletingReview) return;

    try {
      setDeleting(true);

      await deleteReview(deletingReview.id);

      setReviews((currentReviews) =>
        currentReviews.filter(
          (review) =>
            review.id !== deletingReview.id,
        ),
      );

      toast.success("Review deleted successfully.");

      setDeletingReview(null);
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
      setDeleting(false);
    }
  };

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {/* Header */}
        <div>
          <div className="flex items-center gap-2">
            <MessageSquare className="size-6 text-primary" />

            <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
              My Reviews
            </h1>
          </div>

          <p className="mt-2 text-sm text-muted-foreground">
            View and manage the reviews you have submitted.
          </p>
        </div>

        {/* Loading */}
        {loading && (
          <div className="mt-8 flex min-h-60 items-center justify-center rounded-2xl border border-border bg-card">
            <div className="flex flex-col items-center gap-3">
              <Loader2 className="size-7 animate-spin text-primary" />

              <p className="text-sm text-muted-foreground">
                Loading your reviews...
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
                No reviews yet
              </h2>

              <p className="mt-2 text-sm text-muted-foreground">
                You have not submitted any property reviews yet.
              </p>
            </div>
          )}

        {/* Reviews */}
        {!loading &&
          !error &&
          reviews.length > 0 && (
            <div className="mt-8 grid gap-5 md:grid-cols-2">
              {reviews.map((review) => (
                <article
                  key={review.id}
                  className="rounded-2xl border border-border bg-card p-5 transition hover:shadow-sm sm:p-6"
                >
                  {/* Property + Actions */}
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <h2 className="truncate text-lg font-bold">
                        {review.property.title}
                      </h2>

                      <div className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
                        <MapPin className="size-4 shrink-0 text-primary" />

                        <span className="truncate">
                          {review.property.location}
                        </span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex shrink-0 items-center gap-2">
                      {/* Edit */}
                      <button
                        type="button"
                        onClick={() =>
                          handleOpenEdit(review)
                        }
                        className="inline-flex size-9 items-center justify-center rounded-lg border border-border text-muted-foreground transition hover:border-primary hover:bg-primary/5 hover:text-primary"
                        aria-label="Edit review"
                      >
                        <Pencil className="size-4" />
                      </button>

                      {/* Delete */}
                      <button
                        type="button"
                        onClick={() =>
                          handleOpenDelete(review)
                        }
                        className="inline-flex size-9 items-center justify-center rounded-lg border border-border text-muted-foreground transition hover:border-red-500/30 hover:bg-red-500/5 hover:text-red-500"
                        aria-label="Delete review"
                      >
                        <Trash2 className="size-4" />
                      </button>
                    </div>
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
                  <p className="mt-4 text-sm leading-7 text-muted-foreground">
                    {review.comment}
                  </p>

                  {/* Date */}
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

      {editingReview && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              handleCloseEdit();
            }
          }}
        >
          <div className="w-full max-w-lg overflow-hidden rounded-2xl border border-border bg-card shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border p-5">
              <div className="min-w-0">
                <h2 className="text-lg font-bold">
                  Edit Review
                </h2>

                <p className="mt-1 truncate text-sm text-muted-foreground">
                  {editingReview.property.title}
                </p>
              </div>

              <button
                type="button"
                onClick={handleCloseEdit}
                disabled={updating}
                className="flex size-9 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition hover:bg-muted hover:text-foreground disabled:cursor-not-allowed disabled:opacity-50"
                aria-label="Close edit modal"
              >
                <X className="size-5" />
              </button>
            </div>

            {/* Form */}
            <form
              onSubmit={handleUpdate}
              className="space-y-5 p-5"
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
                        editHoverRating || editRating;

                      return (
                        <button
                          key={starNumber}
                          type="button"
                          onClick={() =>
                            setEditRating(
                              starNumber,
                            )
                          }
                          onMouseEnter={() =>
                            setEditHoverRating(
                              starNumber,
                            )
                          }
                          onMouseLeave={() =>
                            setEditHoverRating(0)
                          }
                          className="rounded-md p-1 transition hover:scale-110"
                          aria-label={`Rate ${starNumber} out of 5`}
                        >
                          <Star
                            className={`size-6 ${
                              starNumber <=
                              activeRating
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
                  htmlFor="edit-review-comment"
                  className="mb-2 block text-sm font-semibold"
                >
                  Your review
                </label>

                <textarea
                  id="edit-review-comment"
                  value={editComment}
                  onChange={(event) =>
                    setEditComment(event.target.value)
                  }
                  rows={5}
                  disabled={updating}
                  className="w-full resize-none rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition placeholder:text-muted-foreground focus:border-primary disabled:cursor-not-allowed disabled:opacity-60"
                />
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={handleCloseEdit}
                  disabled={updating}
                  className="h-11 rounded-xl border border-border px-5 text-sm font-semibold transition hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={updating}
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-primary px-5 text-sm font-bold text-primary-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {updating ? (
                    <>
                      <Loader2 className="size-4 animate-spin" />
                      Updating...
                    </>
                  ) : (
                    <>
                      <Pencil className="size-4" />
                      Update Review
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {deletingReview && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              handleCloseDelete();
            }
          }}
        >
          <div className="w-full max-w-md overflow-hidden rounded-2xl border border-border bg-card shadow-2xl">
            {/* Icon + Close */}
            <div className="relative flex justify-center px-6 pt-7">
              <div className="flex size-14 items-center justify-center rounded-full bg-red-500/10">
                <AlertTriangle className="size-7 text-red-500" />
              </div>

              <button
                type="button"
                onClick={handleCloseDelete}
                disabled={deleting}
                className="absolute right-4 top-4 flex size-9 items-center justify-center rounded-lg text-muted-foreground transition hover:bg-muted hover:text-foreground disabled:cursor-not-allowed disabled:opacity-50"
                aria-label="Close delete confirmation"
              >
                <X className="size-5" />
              </button>
            </div>

            {/* Content */}
            <div className="px-6 pb-6 pt-5 text-center">
              <h2 className="text-xl font-bold">
                Delete this review?
              </h2>

              <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-muted-foreground">
                This action cannot be undone. Your review
                will be permanently removed.
              </p>

              {/* Review Preview */}
              <div className="mt-5 rounded-xl border border-border bg-background p-4 text-left">
                <p className="truncate text-sm font-bold">
                  {deletingReview.property.title}
                </p>

                <div className="mt-2 flex items-center gap-1">
                  {Array.from({ length: 5 }).map(
                    (_, index) => (
                      <Star
                        key={index}
                        className={`size-4 ${
                          index <
                          deletingReview.rating
                            ? "fill-primary text-primary"
                            : "text-muted-foreground"
                        }`}
                      />
                    ),
                  )}
                </div>

                <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                  {deletingReview.comment}
                </p>
              </div>

              {/* Actions */}
              <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-center">
                <button
                  type="button"
                  onClick={handleCloseDelete}
                  disabled={deleting}
                  className="h-11 flex-1 rounded-xl border border-border px-5 text-sm font-semibold transition hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={handleDelete}
                  disabled={deleting}
                  className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-red-500 px-5 text-sm font-bold text-white transition hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {deleting ? (
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

