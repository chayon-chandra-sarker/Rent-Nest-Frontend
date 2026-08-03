"use client";

import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface LandlordRequestPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const LandlordRequestPagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: LandlordRequestPaginationProps) => {
  if (totalPages <= 1) {
    return null;
  }

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="mt-8 flex items-center justify-center gap-3">
      <button
        type="button"
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className="inline-flex h-10 items-center gap-2 rounded-lg border border-border px-4 text-sm font-semibold transition hover:bg-muted disabled:cursor-not-allowed disabled:opacity-40"
      >
        <ChevronLeft className="size-4" />
        Previous
      </button>

      <div className="flex h-10 min-w-10 items-center justify-center rounded-lg bg-primary px-3 text-sm font-bold text-primary-foreground">
        {currentPage}
      </div>

      <button
        type="button"
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className="inline-flex h-10 items-center gap-2 rounded-lg border border-border px-4 text-sm font-semibold transition hover:bg-muted disabled:cursor-not-allowed disabled:opacity-40"
      >
        Next
        <ChevronRight className="size-4" />
      </button>
    </div>
  );
};

export default LandlordRequestPagination;