"use client";

import { X } from "lucide-react";

interface AdminDashboardErrorProps {
  onRetry: () => void;
}

const AdminDashboardError = ({
  onRetry,
}: AdminDashboardErrorProps) => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 p-6 dark:bg-slate-950">
      <div className="w-full max-w-md rounded-2xl border bg-white p-8 text-center shadow-lg dark:border-slate-800 dark:bg-slate-900">
        <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-red-50 text-red-500 dark:bg-red-500/10">
          <X size={28} />
        </div>

        <h2 className="mt-5 text-xl font-bold">
          Failed to load dashboard
        </h2>

        <p className="mt-2 text-sm text-slate-500">
          We couldn&apos;t load the dashboard statistics.
          Please try again.
        </p>

        <button
          onClick={onRetry}
          className="mt-6 rounded-xl bg-cyan-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-cyan-600"
        >
          Try Again
        </button>
      </div>
    </div>
  );
};

export default AdminDashboardError;