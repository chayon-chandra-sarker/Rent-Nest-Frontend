import { cookies } from "next/headers";

import type { Payment } from "./payment.service";

interface PaymentsResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: Payment[];
}

export const getLandlordPayments =
  async (): Promise<Payment[]> => {
    const cookieStore = await cookies();

    const accessToken =
      cookieStore.get("accessToken")?.value;

    if (!accessToken) {
      throw new Error("Unauthorized");
    }

    const response = await fetch(
      "https://rent-nest-backend-fiy9.onrender.com/api/payment/landlord-payments",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        cache: "no-store",
      },
    );

    const text = await response.text();

    console.log(
      "Landlord payment status:",
      response.status,
    );

    console.log(
      "Landlord payment response:",
      text,
    );

    let result: PaymentsResponse;

    try {
      result = JSON.parse(text);
    } catch {
      throw new Error(
        `Backend returned invalid JSON. Status: ${response.status}`,
      );
    }

    if (!response.ok || !result.success) {
      throw new Error(
        result.message ||
          "Failed to fetch landlord payments",
      );
    }

    return result.data;
  };