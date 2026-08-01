"use client";

import Link from "next/link";
import {
  ArrowRight,
  Building2,
  FileText,
} from "lucide-react";

const QuickActions = () => {
  return (
    <div className="rounded-2xl border border-border/60 bg-card p-6 shadow-sm">
      <div className="mb-5">
        <h2 className="text-lg font-bold">
          Quick Actions
        </h2>

        <p className="mt-1 text-sm text-muted-foreground">
          Quickly access your rental activities.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {/* Browse Properties */}
        <Link
          href="/properties"
          className="group flex items-center justify-between rounded-xl border border-border/60 p-4 text-left transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:bg-primary/5 hover:shadow-sm"
        >
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-110">
              <Building2 className="size-5" />
            </div>

            <div>
              <p className="font-semibold">
                Browse Properties
              </p>

              <p className="text-xs text-muted-foreground">
                Find your next home
              </p>
            </div>
          </div>

          <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>

        {/* My Rental Requests */}
        <Link
          href="/dashboard/rentals"
          className="group flex items-center justify-between rounded-xl border border-border/60 p-4 text-left transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-500/40 hover:bg-blue-500/5 hover:shadow-sm"
        >
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-500 transition-transform duration-300 group-hover:scale-110">
              <FileText className="size-5" />
            </div>

            <div>
              <p className="font-semibold">
                My Rental Requests
              </p>

              <p className="text-xs text-muted-foreground">
                Check request status
              </p>
            </div>
          </div>

          <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
};

export default QuickActions;