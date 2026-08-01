"use client";

import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface PaymentPaginationProps {
  currentPage: number;
  totalPages: number;
  startIndex: number;
  endIndex: number;
  totalItems: number;
  onPageChange: (page: number) => void;
}

const PaymentPagination = ({
  currentPage,
  totalPages,
  startIndex,
  endIndex,
  totalItems,
  onPageChange,
}: PaymentPaginationProps) => {
  if (totalPages <= 1) return null;

  return (
    <div className="border-t border-border/60 px-4 py-5 sm:px-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <p className="text-center text-xs font-medium text-muted-foreground sm:text-left">
          Showing{" "}
          <span className="font-bold text-foreground">
            {startIndex + 1}
          </span>{" "}
          to{" "}
          <span className="font-bold text-foreground">
            {Math.min(endIndex, totalItems)}
          </span>{" "}
          of{" "}
          <span className="font-bold text-foreground">
            {totalItems}
          </span>{" "}
          payments
        </p>

        <div className="flex items-center justify-center gap-2">

          <button
            type="button"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="flex items-center gap-1.5 rounded-xl border border-border bg-background px-3 py-2 text-xs font-semibold transition hover:bg-muted disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ChevronLeft className="size-4" />

            <span className="hidden sm:inline">
              Previous
            </span>
          </button>

          <div className="flex items-center gap-1.5">
            {Array.from(
              { length: totalPages },
              (_, index) => {
                const page = index + 1;

                return (
                  <button
                    key={page}
                    type="button"
                    onClick={() => onPageChange(page)}
                    className={`flex size-9 items-center justify-center rounded-xl text-xs font-bold transition ${
                      currentPage === page
                        ? "bg-primary text-primary-foreground shadow-sm"
                        : "border border-border bg-background text-muted-foreground hover:bg-muted hover:text-foreground"
                    }`}
                  >
                    {page}
                  </button>
                );
              }
            )}
          </div>

          <button
            type="button"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="flex items-center gap-1.5 rounded-xl border border-border bg-background px-3 py-2 text-xs font-semibold transition hover:bg-muted disabled:cursor-not-allowed disabled:opacity-40"
          >
            <span className="hidden sm:inline">
              Next
            </span>

            <ChevronRight className="size-4" />
          </button>

        </div>
      </div>
    </div>
  );
};

export default PaymentPagination;