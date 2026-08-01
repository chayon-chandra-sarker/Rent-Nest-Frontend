export interface PaymentTenant {
  id: string;
  name: string;
  email: string;
}

export interface PaymentProperty {
  id: string;
  title: string;
  location: string;
}

export interface Payment {
  id: string;
  transactionId: string;
  amount: string;
  currency: string;
  status: string;
  paidAt: string;
  createdAt: string;
  tenant: PaymentTenant;
  property: PaymentProperty;
}

interface PaymentsResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: Payment[];
}

export const getAllPayments = async (): Promise<Payment[]> => {
  const response = await fetch("/api/admin/payments", {
    method: "GET",
    credentials: "include",
    cache: "no-store",
  });

  const result: PaymentsResponse = await response.json();

  if (!response.ok || !result.success) {
    throw new Error(
      result.message || "Failed to fetch payments"
    );
  }

  return result.data;
};