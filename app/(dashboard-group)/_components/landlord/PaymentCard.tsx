"use client";

import {
  CalendarDays,
  CheckCircle2,
  CreditCard,
  MapPin,
  ReceiptText,
  UserRound,
} from "lucide-react";

import type { Payment } from "@/service/payment.service";

interface PaymentCardProps {
  payment: Payment;
}

const formatDate = (date: string | null) => {
  if (!date) {
    return "Not paid yet";
  }

  return new Date(date).toLocaleString("en-US", {
    timeZone: "Asia/Dhaka",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const PaymentCard = ({ payment }: PaymentCardProps) => {
  return (
    <article className="group overflow-hidden rounded-3xl border border-border/60 bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/20 hover:shadow-xl">
      {/* TOP */}
      <div className="p-5">
        <div className="flex flex-col gap-5">
          {/* PROPERTY */}

          <div className="flex items-start gap-4">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-105">
              <CreditCard className="size-6" />
            </div>

            <div className="min-w-0">
              <h2 className="truncate text-lg font-bold">
                {payment.property.title}
              </h2>

              <div className="mt-1.5 flex items-center gap-1.5 text-sm text-muted-foreground">
                <MapPin className="size-4 shrink-0 text-primary" />

                <span className="truncate">
                  {payment.property.location}
                </span>
              </div>
            </div>
          </div>

          {/* AMOUNT */}

          <div className="rounded-2xl border border-primary/10 bg-primary/5 p-4">
            <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
              Amount Received
            </p>

            <div className="flex items-center justify-between gap-3">
              <p className="mt-1 text-2xl font-black text-primary">
                {payment.currency}{" "}
                {Number(payment.amount).toLocaleString()}
              </p>

              <span
                className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-bold ${
                  payment.status === "COMPLETED"
                    ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                    : "bg-amber-500/10 text-amber-600 dark:text-amber-400"
                }`}
              >
                <span
                  className={`size-1.5 rounded-full ${
                    payment.status === "COMPLETED"
                      ? "bg-emerald-500"
                      : "bg-amber-500"
                  }`}
                />

                {payment.status}
              </span>
            </div>
          </div>

          {/* TENANT */}

          <div className="flex items-center gap-3 rounded-2xl bg-muted/30 p-4">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-background text-primary shadow-sm">
              <UserRound className="size-4" />
            </div>

            <div className="min-w-0">
              <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                Tenant
              </p>

              <p className="mt-0.5 truncate text-sm font-bold">
                {payment.tenant.name}
              </p>

              <p className="truncate text-xs text-muted-foreground">
                {payment.tenant.email}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* DETAILS */}

      <div className="border-t border-border/60 bg-muted/10 p-4">
        <div className="space-y-3">
          {/* TRANSACTION ID */}

          <div className="rounded-2xl border border-border/60 bg-card p-3.5">
            <div className="flex items-center gap-2">
              <ReceiptText className="size-4 text-primary" />

              <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                Transaction ID
              </p>
            </div>

            <p className="mt-2 break-all font-mono text-[11px] font-medium">
              {payment.transactionId}
            </p>
          </div>

          {/* DATES */}

          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-2xl border border-border/60 bg-card p-3.5">
              <div className="flex items-center gap-2">
                <CalendarDays className="size-4 text-primary" />

                <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                  Created
                </p>
              </div>

              <p className="mt-2 text-xs font-semibold">
                {formatDate(payment.createdAt)}
              </p>
            </div>

            <div className="rounded-2xl border border-border/60 bg-card p-3.5">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="size-4 text-emerald-500" />

                <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                  Paid
                </p>
              </div>

              <p className="mt-2 text-xs font-semibold">
                {formatDate(payment.paidAt)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default PaymentCard;