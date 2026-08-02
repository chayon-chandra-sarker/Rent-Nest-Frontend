"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaymentPaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
}

const PaymentPagination = ({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange,
}: PaymentPaginationProps) => {
  const startItem =
    (currentPage - 1) * itemsPerPage + 1;

  const endItem = Math.min(
    currentPage * itemsPerPage,
    totalItems
  );

  return (
    <div className="flex flex-col gap-4 rounded-3xl border border-border/60 bg-card p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:p-5">
      <div>
        <p className="text-sm font-semibold">
          Payments
        </p>

        <p className="mt-0.5 text-xs text-muted-foreground">
          Showing{" "}
          <span className="font-semibold text-foreground">
            {startItem}
          </span>{" "}
          -{" "}
          <span className="font-semibold text-foreground">
            {endItem}
          </span>{" "}
          of{" "}
          <span className="font-semibold text-foreground">
            {totalItems}
          </span>
        </p>
      </div>

      <div className="flex items-center gap-2">
        {/* PREVIOUS */}

        <button
          type="button"
          onClick={() =>
            onPageChange(
              Math.max(currentPage - 1, 1)
            )
          }
          disabled={currentPage === 1}
          className="inline-flex h-10 items-center gap-2 rounded-xl border border-border px-4 text-sm font-semibold transition hover:bg-muted disabled:pointer-events-none disabled:opacity-40"
        >
          <ChevronLeft className="size-4" />
          Previous
        </button>

        {/* CURRENT PAGE */}

        <div className="flex h-10 min-w-10 items-center justify-center rounded-xl bg-primary px-3 text-sm font-bold text-primary-foreground shadow-sm">
          {currentPage}
        </div>

        {/* NEXT */}

        <button
          type="button"
          onClick={() =>
            onPageChange(
              Math.min(
                currentPage + 1,
                totalPages
              )
            )
          }
          disabled={currentPage === totalPages}
          className="inline-flex h-10 items-center gap-2 rounded-xl border border-border px-4 text-sm font-semibold transition hover:bg-muted disabled:pointer-events-none disabled:opacity-40"
        >
          Next
          <ChevronRight className="size-4" />
        </button>
      </div>
    </div>
  );
};

export default PaymentPagination;