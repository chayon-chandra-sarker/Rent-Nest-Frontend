

export interface MyRentalRequest {
  id: string;
  propertyId: string;
  tenantId: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  requestedAt: string;
  approvedAt: string | null;

  property: {
    id: string;
    title: string;
    location: string;
    price: string;
    isAvailable: boolean;
  };
}


interface MyRentalRequestsResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: MyRentalRequest[];
}


export const getMyRentalRequests = async (): Promise<
  MyRentalRequest[]
> => {
  const response = await fetch("/api/rental-requests", {
    method: "GET",
    credentials: "include",
    cache: "no-store",
  });

  const result: MyRentalRequestsResponse =
    await response.json();

  if (!response.ok || !result.success) {
    throw new Error(
      result.message || "Failed to fetch rental requests"
    );
  }

  return result.data;
};


interface CreateRentalRequestResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: MyRentalRequest;
}


export const createRentalRequest = async (
  propertyId: string
): Promise<MyRentalRequest> => {
  const response = await fetch("/api/rental-requests", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      propertyId,
    }),
  });

  const result: CreateRentalRequestResponse =
    await response.json();

  if (!response.ok || !result.success) {
    throw new Error(
      result.message || "Failed to create rental request"
    );
  }

  return result.data;
};