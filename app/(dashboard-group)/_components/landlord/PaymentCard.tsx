"use client";

import {
  CalendarDays,
  CheckCircle2,
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
    <div className="w-full overflow-hidden rounded-2xl border border-border/60 bg-card shadow-sm">
      {/* TABLE SCROLL CONTAINER */}
      <div className="max-h-[600px] overflow-auto">
        <table className="w-full min-w-[1000px] text-left">
          {/* TABLE HEADER */}
          <thead className="sticky top-0 z-10 border-b border-border bg-card">
            <tr>
              <th className="px-5 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Property
              </th>

              <th className="px-5 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Tenant
              </th>

              <th className="px-5 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Amount
              </th>

              <th className="px-5 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Status
              </th>

              <th className="px-5 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Transaction ID
              </th>

              <th className="px-5 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Created
              </th>

              <th className="px-5 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Paid
              </th>
            </tr>
          </thead>

          {/* TABLE BODY */}
          <tbody>
            <tr className="border-b border-border/50 transition-colors last:border-0 hover:bg-muted/20">
              {/* PROPERTY */}
              <td className="px-5 py-5">
                <div className="flex items-start gap-3">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <ReceiptText className="size-4" />
                  </div>

                  <div className="min-w-0 max-w-[190px]">
                    <p className="truncate text-sm font-bold">
                      {payment.property.title}
                    </p>

                    <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                      <MapPin className="size-3.5 shrink-0 text-primary" />

                      <span className="truncate">
                        {payment.property.location}
                      </span>
                    </div>
                  </div>
                </div>
              </td>

              {/* TENANT */}
              <td className="px-5 py-5">
                <div className="flex items-center gap-3">
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <UserRound className="size-4" />
                  </div>

                  <div className="min-w-0 max-w-[180px]">
                    <p className="truncate text-sm font-bold">
                      {payment.tenant.name}
                    </p>

                    <p className="truncate text-xs text-muted-foreground">
                      {payment.tenant.email}
                    </p>
                  </div>
                </div>
              </td>

              {/* AMOUNT */}
              <td className="whitespace-nowrap px-5 py-5">
                <p className="text-lg font-black text-primary">
                  {payment.currency} {Number(payment.amount).toLocaleString()}
                </p>

                <p className="mt-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                  Amount Received
                </p>
              </td>

              {/* STATUS */}
              <td className="px-5 py-5">
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
              </td>

              {/* TRANSACTION ID */}
              <td className="px-5 py-5">
                <div className="flex items-center gap-2">
                  <ReceiptText className="size-4 shrink-0 text-primary" />

                  <p
                    className="max-w-[180px] truncate font-mono text-[11px] font-medium"
                    title={payment.transactionId}
                  >
                    {payment.transactionId}
                  </p>
                </div>
              </td>

              {/* CREATED */}
              <td className="px-5 py-5">
                <div className="flex items-start gap-2">
                  <CalendarDays className="mt-0.5 size-4 shrink-0 text-primary" />

                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                      Created
                    </p>

                    <p className="mt-1 whitespace-nowrap text-xs font-semibold">
                      {formatDate(payment.createdAt)}
                    </p>
                  </div>
                </div>
              </td>

              {/* PAID */}
              <td className="px-5 py-5">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-emerald-500" />

                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                      Paid
                    </p>

                    <p className="mt-1 whitespace-nowrap text-xs font-semibold">
                      {formatDate(payment.paidAt)}
                    </p>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentCard;
