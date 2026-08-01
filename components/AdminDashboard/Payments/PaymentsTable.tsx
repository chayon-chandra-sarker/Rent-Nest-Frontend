"use client";

import { useEffect, useState } from "react";
import {
  CreditCard,
  XCircle,
} from "lucide-react";

import {
  getAllPayments,
  Payment,
} from "@/service/payment.service";

import PaymentDesktopTable from "./PaymentDesktopTable";
import PaymentMobileCard from "./PaymentMobileCard";
import PaymentPagination from "./PaymentPagination";

const ITEMS_PER_PAGE = 6;

const PaymentsTable = () => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getAllPayments();

        setPayments(data);
      } catch (error) {
        console.error("Fetch payments error:", error);

        setError(
          error instanceof Error
            ? error.message
            : "Failed to fetch payments"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, []);

  const totalPages = Math.ceil(
    payments.length / ITEMS_PER_PAGE
  );

  const startIndex =
    (currentPage - 1) * ITEMS_PER_PAGE;

  const endIndex =
    startIndex + ITEMS_PER_PAGE;

  const currentPayments = payments.slice(
    startIndex,
    endIndex
  );

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;

    setCurrentPage(page);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (loading) {
    return (
      <section className="rounded-3xl border border-border/60 bg-card p-12 shadow-sm">
        <div className="flex flex-col items-center justify-center">

          <div className="size-9 animate-spin rounded-full border-4 border-primary/20 border-t-primary" />

          <p className="mt-4 text-sm font-medium text-muted-foreground">
            Loading payments...
          </p>

        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="rounded-3xl border border-destructive/20 bg-card p-12 shadow-sm">

        <div className="mx-auto flex max-w-md flex-col items-center text-center">

          <div className="flex size-14 items-center justify-center rounded-2xl bg-destructive/10">
            <XCircle className="size-7 text-destructive" />
          </div>

          <h2 className="mt-5 text-lg font-bold">
            Failed to load payments
          </h2>

          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            {error}
          </p>

        </div>

      </section>
    );
  }

  return (
    <section className="overflow-hidden rounded-3xl border border-border/60 bg-card shadow-sm">

      {/* Header */}
      <div className="border-b border-border/60 px-5 py-6 sm:px-7">

        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

          <div className="flex items-center gap-3">

            <div className="flex size-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <CreditCard className="size-5" />
            </div>

            <div>
              <h1 className="text-xl font-bold tracking-tight sm:text-2xl">
                Payments
              </h1>

              <p className="mt-1 text-sm text-muted-foreground">
                Monitor and review all rental payments.
              </p>
            </div>

          </div>

          <div className="w-fit rounded-2xl border border-primary/10 bg-primary/5 px-4 py-3">

            <p className="text-xs font-medium text-muted-foreground">
              Total Payments
            </p>

            <p className="text-lg font-bold text-primary">
              {payments.length}
            </p>

          </div>

        </div>

      </div>

      {/* Empty */}
      {payments.length === 0 ? (
        <div className="px-6 py-20 text-center">

          <div className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-muted">
            <CreditCard className="size-7 text-muted-foreground" />
          </div>

          <h2 className="mt-5 text-lg font-bold">
            No payments found
          </h2>

          <p className="mt-2 text-sm text-muted-foreground">
            There are currently no payments available.
          </p>

        </div>
      ) : (
        <>
          {/* Desktop */}
          <PaymentDesktopTable
            payments={currentPayments}
          />

          {/* Mobile */}
          <div className="grid gap-4 p-4 sm:p-6 xl:hidden">
            {currentPayments.map((payment) => (
              <PaymentMobileCard
                key={payment.id}
                payment={payment}
              />
            ))}
          </div>

          {/* Pagination */}
          <PaymentPagination
            currentPage={currentPage}
            totalPages={totalPages}
            startIndex={startIndex}
            endIndex={endIndex}
            totalItems={payments.length}
            onPageChange={handlePageChange}
          />
        </>
      )}

    </section>
  );
};

export default PaymentsTable;