"use client";

import { useState } from "react";
import { CheckCircle2, WalletCards } from "lucide-react";

import type { Payment } from "@/service/payment.service";
import PaymentCard from "./PaymentCard";
import PaymentPagination from "./PaymentPagination";

interface PaymentListProps {
  payments: Payment[];
}

const ITEMS_PER_PAGE = 4;

const PaymentList = ({ payments }: PaymentListProps) => {
  const [currentPage, setCurrentPage] = useState(1);

  const completedPayments = payments.filter(
    (payment) => payment.status === "COMPLETED",
  );

  const totalReceived = completedPayments.reduce(
    (total, payment) => total + Number(payment.amount),
    0,
  );

  const totalPages = Math.ceil(payments.length / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;

  const currentPayments = payments.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );

  return (
    <div className="space-y-8">
      {/* ================= HEADER ================= */}

      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/5 px-3 py-1.5 text-xs font-semibold text-primary">
            <WalletCards className="size-3.5" />
            Payment Management
          </div>

          <h1 className="text-3xl font-black tracking-tight sm:text-4xl">
            Payments
          </h1>

          <p className="mt-2 max-w-xl text-sm leading-6 text-muted-foreground sm:text-base">
            Track payments received from tenants for your rental properties.
          </p>
        </div>

        <div className="rounded-2xl border border-border/60 bg-card px-5 py-4 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Total Transactions
          </p>

          <p className="mt-1 text-2xl font-black">{payments.length}</p>
        </div>
      </div>

      {/* ================= SUMMARY ================= */}

      {payments.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-2">
          {/* TOTAL RECEIVED */}

          <div className="group relative overflow-hidden rounded-3xl border border-border/60 bg-card p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
            <div className="absolute -right-10 -top-10 size-28 rounded-full bg-primary/5 transition-transform duration-300 group-hover:scale-125" />

            <div className="relative">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Total Received
              </p>

              <p className="mt-2 text-2xl font-black text-primary">
                ৳{totalReceived.toLocaleString()}
              </p>

              <p className="mt-1 text-xs text-muted-foreground">
                Successfully completed payments
              </p>
            </div>
          </div>

          {/* COMPLETED */}

          <div className="group relative overflow-hidden rounded-3xl border border-border/60 bg-card p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
            <div className="absolute -right-10 -top-10 size-28 rounded-full bg-emerald-500/5 transition-transform duration-300 group-hover:scale-125" />

            <div className="relative flex items-center gap-4">
              <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="size-6" />
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Completed Payments
                </p>

                <p className="mt-1 text-2xl font-black">
                  {completedPayments.length}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= EMPTY STATE ================= */}

      {payments.length === 0 ? (
        <div className="rounded-3xl border border-border/60 bg-card px-6 py-20 text-center shadow-sm">
          <div className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-muted">
            <WalletCards className="size-7 text-muted-foreground" />
          </div>

          <h2 className="mt-5 text-lg font-bold">No payments found</h2>

          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted-foreground">
            Payments from your tenants will appear here after successful
            transactions.
          </p>
        </div>
      ) : (
        <>
          {/* ================= PAYMENT CARDS ================= */}

          <div className="w-full">
            {currentPayments.map((payment) => (
              <PaymentCard key={payment.id} payment={payment} />
            ))}
          </div>

          {/* ================= PAGINATION ================= */}

          {totalPages > 1 && (
            <PaymentPagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={payments.length}
              itemsPerPage={ITEMS_PER_PAGE}
              onPageChange={setCurrentPage}
            />
          )}
        </>
      )}
    </div>
  );
};

export default PaymentList;
