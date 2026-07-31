
"use client";

import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface UserPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const UserPagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: UserPaginationProps) => {
  // একটাই page হলে pagination দেখাবে না
  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="mt-8 flex flex-wrap items-center justify-center gap-2">

      {/* Previous */}
      <button
        type="button"
        onClick={() =>
          onPageChange(currentPage - 1)
        }
        disabled={currentPage === 1}
        className="flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
      >
        <ChevronLeft size={17} />

        Previous
      </button>

      {/* Page Numbers */}
      {Array.from(
        { length: totalPages },
        (_, index) => {
          const page = index + 1;

          return (
            <button
              key={page}
              type="button"
              onClick={() =>
                onPageChange(page)
              }
              className={`flex size-9 items-center justify-center rounded-lg text-sm font-semibold transition ${
                currentPage === page
                  ? "bg-cyan-500 text-white shadow-sm"
                  : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
              }`}
            >
              {page}
            </button>
          );
        }
      )}

      {/* Next */}
      <button
        type="button"
        onClick={() =>
          onPageChange(currentPage + 1)
        }
        disabled={
          currentPage === totalPages
        }
        className="flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
      >
        Next

        <ChevronRight size={17} />
      </button>

    </div>
  );
};

export default UserPagination;
