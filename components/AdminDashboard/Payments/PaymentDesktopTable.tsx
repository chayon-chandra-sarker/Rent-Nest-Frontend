
import {
  BadgeCheck,
  CalendarDays,
  CreditCard,
  Mail,
  MapPin,
  ReceiptText,
  User,
  XCircle,
} from "lucide-react";

import { Payment } from "@/service/payment.service";

interface PaymentDesktopTableProps {
  payments: Payment[];
}

const getStatusConfig = (status: string) => {
  switch (status?.toUpperCase()) {
    case "COMPLETED":
      return {
        label: "Completed",
        className:
          "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-400",
        dot: "bg-emerald-500",
        icon: <BadgeCheck className="size-4" />,
      };

    case "FAILED":
      return {
        label: "Failed",
        className:
          "border-red-200 bg-red-50 text-red-700 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-400",
        dot: "bg-red-500",
        icon: <XCircle className="size-4" />,
      };

    default:
      return {
        label: "Pending",
        className:
          "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-500/20 dark:bg-amber-500/10 dark:text-amber-400",
        dot: "bg-amber-500",
        icon: <CreditCard className="size-4" />,
      };
  }
};

const formatDate = (date: string | null) => {
  if (!date) return "—";

  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const PaymentDesktopTable = ({
  payments,
}: PaymentDesktopTableProps) => {
  return (
    <div className="hidden overflow-x-auto xl:block">
      <table className="w-full min-w-[1100px]">

        {/* ==========================================
            TABLE HEADER
        ========================================== */}

        <thead>
          <tr className="border-b border-border/60 bg-muted/20">

            {/* Tenant */}
            <th className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
              Tenant
            </th>

            {/* Property */}
            <th className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
              Property
            </th>

            {/* Transaction */}
            <th className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
              Transaction ID
            </th>

            {/* Amount */}
            <th className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
              Amount
            </th>

            {/* Paid */}
            <th className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
              Paid
            </th>

            {/* Status */}
            <th className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
              Status
            </th>

          </tr>
        </thead>

        {/* ==========================================
            TABLE BODY
        ========================================== */}

        <tbody>
          {payments.map((payment) => {
            const status = getStatusConfig(payment.status);

            return (
              <tr
                key={payment.id}
                className="border-b border-border/50 transition-colors hover:bg-muted/20 last:border-0"
              >

                {/* ======================================
                    TENANT
                ====================================== */}

                <td className="px-6 py-5 align-top">
                  <div className="flex min-w-[210px] items-start gap-3">

                    <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <User className="size-5" />
                    </div>

                    <div className="min-w-0">
                      <p className="truncate text-sm font-bold">
                        {payment.tenant.name}
                      </p>

                      <div className="mt-1.5 flex items-center gap-1.5">
                        <Mail className="size-3.5 shrink-0 text-muted-foreground" />

                        <span className="truncate text-xs text-muted-foreground">
                          {payment.tenant.email}
                        </span>
                      </div>
                    </div>

                  </div>
                </td>

                {/* ======================================
                    PROPERTY
                ====================================== */}

                <td className="px-6 py-5 align-top">
                  <div className="min-w-[210px]">

                    <p className="truncate text-sm font-bold">
                      {payment.property.title}
                    </p>

                    <div className="mt-1.5 flex items-center gap-1.5">
                      <MapPin className="size-3.5 shrink-0 text-primary" />

                      <span className="truncate text-xs text-muted-foreground">
                        {payment.property.location}
                      </span>
                    </div>

                  </div>
                </td>

                {/* ======================================
                    TRANSACTION ID
                ====================================== */}

                <td className="px-6 py-5 align-top">
                  <div className="flex min-w-[300px] items-start gap-2.5">

                    <div className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-xl bg-muted">
                      <ReceiptText className="size-4 text-muted-foreground" />
                    </div>

                    <div className="min-w-0">

                      <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                        Transaction ID
                      </p>

                      <p
                        title={payment.transactionId}
                        className="break-all text-xs font-semibold leading-5 text-foreground"
                      >
                        {payment.transactionId}
                      </p>

                    </div>

                  </div>
                </td>

                {/* ======================================
                    AMOUNT
                ====================================== */}

                <td className="px-6 py-5 align-top">
                  <div className="min-w-[100px]">

                    <p className="text-base font-extrabold text-primary">
                      {payment.currency === "BDT"
                        ? "৳"
                        : payment.currency}{" "}
                      {Number(payment.amount).toLocaleString()}
                    </p>

                    <p className="mt-1 text-[10px] font-medium text-muted-foreground">
                      Payment amount
                    </p>

                  </div>
                </td>

                {/* ======================================
                    PAID
                ====================================== */}

                <td className="px-6 py-5 align-top">
                  <div className="flex min-w-[130px] items-center gap-2 rounded-xl bg-muted/40 px-3 py-2.5">

                    <CalendarDays className="size-4 shrink-0 text-muted-foreground" />

                    <span className="whitespace-nowrap text-xs font-semibold">
                      {formatDate(payment.paidAt)}
                    </span>

                  </div>
                </td>

                {/* ======================================
                    STATUS
                ====================================== */}

                <td className="px-6 py-5 align-top">
                  <span
                    className={`inline-flex items-center gap-2 whitespace-nowrap rounded-full border px-3 py-1.5 text-xs font-bold ${status.className}`}
                  >

                    <span
                      className={`size-1.5 rounded-full ${status.dot}`}
                    />

                    {status.icon}

                    {status.label}

                  </span>
                </td>

              </tr>
            );
          })}
        </tbody>

      </table>
    </div>
  );
};

export default PaymentDesktopTable;

