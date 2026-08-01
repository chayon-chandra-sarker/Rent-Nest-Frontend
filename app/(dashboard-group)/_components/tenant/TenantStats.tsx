
"use client";

import {
  CheckCircle2,
  CreditCard,
  FileText,
  Loader2,
} from "lucide-react";

interface TenantStatsProps {
  rentalLoading: boolean;
  paymentLoading: boolean;
  totalRequests: number;
  approvedRequests: number;
  totalPaymentAmount: number;
}

const TenantStats = ({
  rentalLoading,
  paymentLoading,
  totalRequests,
  approvedRequests,
  totalPaymentAmount,
}: TenantStatsProps) => {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

      {/* =========================
          MY RENTALS
      ========================= */}

      <div className="group rounded-2xl border border-border/60 bg-card p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/20 hover:shadow-md">

        <div className="flex items-center justify-between">

          <div>
            <p className="text-sm text-muted-foreground">
              My Rentals
            </p>

            <div className="mt-2 flex min-h-8 items-center">
              {rentalLoading ? (
                <Loader2 className="size-6 animate-spin text-primary" />
              ) : (
                <h2 className="text-2xl font-bold">
                  {approvedRequests}
                </h2>
              )}
            </div>
          </div>

          <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-110">
            <CheckCircle2 className="size-5" />
          </div>

        </div>

        <p className="mt-3 text-xs text-muted-foreground">
          Approved rental requests
        </p>

      </div>

      {/* =========================
          RENTAL REQUESTS
      ========================= */}

      <div className="group rounded-2xl border border-border/60 bg-card p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/20 hover:shadow-md">

        <div className="flex items-center justify-between">

          <div>
            <p className="text-sm text-muted-foreground">
              Rental Requests
            </p>

            <div className="mt-2 flex min-h-8 items-center">
              {rentalLoading ? (
                <Loader2 className="size-6 animate-spin text-blue-500" />
              ) : (
                <h2 className="text-2xl font-bold">
                  {totalRequests}
                </h2>
              )}
            </div>
          </div>

          <div className="flex size-11 items-center justify-center rounded-xl bg-blue-500/10 text-blue-500 transition-transform duration-300 group-hover:scale-110">
            <FileText className="size-5" />
          </div>

        </div>

        <p className="mt-3 text-xs text-muted-foreground">
          Total rental requests
        </p>

      </div>

      {/* =========================
          TOTAL PAID
      ========================= */}

      <div className="group rounded-2xl border border-border/60 bg-card p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500/20 hover:shadow-md">

        <div className="flex items-center justify-between">

          <div>
            <p className="text-sm text-muted-foreground">
              Total Paid
            </p>

            <div className="mt-2 flex min-h-8 items-center">
              {paymentLoading ? (
                <Loader2 className="size-6 animate-spin text-emerald-500" />
              ) : (
                <h2 className="text-2xl font-bold">
                  ৳{totalPaymentAmount.toLocaleString()}
                </h2>
              )}
            </div>
          </div>

          <div className="flex size-11 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-500 transition-transform duration-300 group-hover:scale-110">
            <CreditCard className="size-5" />
          </div>

        </div>

        <p className="mt-3 text-xs text-muted-foreground">
          Total completed payments
        </p>

      </div>

    </div>
  );
};

export default TenantStats;

