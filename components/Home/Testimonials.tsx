
"use client";

import { useEffect, useState } from "react";
import { Star } from "lucide-react";

import {
  getAllReviews,
  type Review,
} from "@/service/review.service";

import { ReviewPagination } from "./ReviewPagination";

const REVIEWS_PER_PAGE = 3;

export function Testimonials() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
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

        setError("Failed to load reviews.");
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  const totalPages = Math.ceil(
    reviews.length / REVIEWS_PER_PAGE,
  );

  const startIndex =
    (currentPage - 1) * REVIEWS_PER_PAGE;

  const currentReviews = reviews.slice(
    startIndex,
    startIndex + REVIEWS_PER_PAGE,
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);

    document
      .getElementById("testimonials")
      ?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
  };

  return (
    <section
      id="testimonials"
      className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24"
    >
      <div className="mx-auto max-w-2xl text-center">
        <span className="text-sm font-bold uppercase tracking-wider text-primary">
          Loved by renters
        </span>

        <h2 className="mt-2 text-balance text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
          Trusted by our happy tenants
        </h2>
      </div>

      {/* Loading */}
      {loading && (
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="animate-pulse rounded-2xl border border-border bg-card p-6"
            >
              <div className="h-4 w-24 rounded bg-muted" />

              <div className="mt-5 space-y-2">
                <div className="h-4 rounded bg-muted" />
                <div className="h-4 rounded bg-muted" />
                <div className="h-4 w-3/4 rounded bg-muted" />
              </div>

              <div className="mt-6 flex items-center gap-3 border-t border-border pt-5">
                <div className="size-11 rounded-full bg-muted" />

                <div className="space-y-2">
                  <div className="h-4 w-24 rounded bg-muted" />
                  <div className="h-3 w-32 rounded bg-muted" />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Error */}
      {!loading && error && (
        <div className="mt-12 text-center text-sm text-muted-foreground">
          {error}
        </div>
      )}

      {/* Empty */}
      {!loading &&
        !error &&
        reviews.length === 0 && (
          <div className="mt-12 text-center text-sm text-muted-foreground">
            No reviews yet.
          </div>
        )}

      {/* Reviews */}
      {!loading &&
        !error &&
        reviews.length > 0 && (
          <>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {currentReviews.map((review) => (
                <figure
                  key={review.id}
                  className="flex flex-col rounded-2xl border border-border bg-card p-6"
                >
                  {/* Rating */}
                  <div className="flex gap-1">
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

                  {/* Comment */}
                  <blockquote className="mt-4 flex-1 text-pretty leading-relaxed text-foreground">
                    &ldquo;{review.comment}&rdquo;
                  </blockquote>

                  {/* User */}
                  <figcaption className="mt-6 flex items-center gap-3 border-t border-border pt-5">
                    <span className="flex size-11 items-center justify-center rounded-full bg-primary/15 text-sm font-bold text-primary">
                      {review.tenant.name
                        .split(" ")
                        .map((name) => name[0])
                        .join("")
                        .slice(0, 2)
                        .toUpperCase()}
                    </span>

                    <span className="min-w-0">
                      <span className="block truncate font-bold text-foreground">
                        {review.tenant.name}
                      </span>

                      <span className="block truncate text-sm text-muted-foreground">
                        Tenant ·{" "}
                        {review.property.location}
                      </span>
                    </span>
                  </figcaption>
                </figure>
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
    </section>
  );
}

