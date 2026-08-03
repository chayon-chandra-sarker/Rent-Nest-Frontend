
"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

interface ReviewPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function ReviewPagination({
  currentPage,
  totalPages,
  onPageChange,
}: ReviewPaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  const pages = Array.from(
    { length: totalPages },
    (_, index) => index + 1,
  );

  return (
    <div className="mt-8 flex items-center justify-center gap-2">
      {/* Previous */}
      <button
        type="button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex size-9 items-center justify-center rounded-lg border border-border bg-card transition hover:bg-muted disabled:cursor-not-allowed disabled:opacity-40"
        aria-label="Previous reviews"
      >
        <ChevronLeft className="size-4" />
      </button>

      {/* Pages */}
      {pages.map((page) => (
        <button
          key={page}
          type="button"
          onClick={() => onPageChange(page)}
          className={`flex size-9 items-center justify-center rounded-lg text-sm font-semibold transition ${
            currentPage === page
              ? "bg-primary text-primary-foreground"
              : "border border-border bg-card hover:bg-muted"
          }`}
        >
          {page}
        </button>
      ))}

      {/* Next */}
      <button
        type="button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex size-9 items-center justify-center rounded-lg border border-border bg-card transition hover:bg-muted disabled:cursor-not-allowed disabled:opacity-40"
        aria-label="Next reviews"
      >
        <ChevronRight className="size-4" />
      </button>
    </div>
  );
}

