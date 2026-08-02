
"use client";

import { useState } from "react";
import { CreditCard, Loader2 } from "lucide-react";
import { toast } from "sonner";

import { createCheckoutSession } from "@/service/payment.service";

interface PayNowButtonProps {
  rentalRequestId: string;
}

const PayNowButton = ({
  rentalRequestId,
}: PayNowButtonProps) => {
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    try {
      setLoading(true);

      const paymentUrl =
        await createCheckoutSession(rentalRequestId);

      if (!paymentUrl) {
        throw new Error("Payment URL not found");
      }

      window.location.href = paymentUrl;
    } catch (error) {
      console.error("Payment error:", error);

      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to start payment",
      );

      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handlePayment}
      disabled={loading}
      className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-bold text-primary-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {loading ? (
        <>
          <Loader2 className="size-4 animate-spin" />
          Redirecting to Stripe...
        </>
      ) : (
        <>
          <CreditCard className="size-4" />
          Pay Now
        </>
      )}
    </button>
  );
};

export default PayNowButton;

