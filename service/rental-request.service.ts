export interface RentalRequest {
  id: string;
  propertyId: string;
  tenantId: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  requestedAt: string;
  approvedAt: string | null;

  tenant: {
    id: string;
    name: string;
    email: string;
    phone: string | null;
    status: string;
  };

  property: {
    id: string;
    landlordId: string;
    categoryId: string;
    title: string;
    description: string;
    location: string;
    price: string;
    bedrooms: number;
    bathrooms: number;
    amenities: string[];
    isAvailable: boolean;
    createdAt: string;
    updatedAt: string;

    landlord: {
      id: string;
      name: string;
      email: string;
    };

    category: {
      id: string;
      name: string;
      createdAt: string;
      updatedAt: string;
    };
  };
}

interface RentalRequestsResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: RentalRequest[];
}

export const getAllRentalRequests = async (): Promise<
  RentalRequest[]
> => {
  const response = await fetch("/api/admin/rental-requests", {
    credentials: "include",
    cache: "no-store",
  });

  const result: RentalRequestsResponse =
    await response.json();

  if (!response.ok || !result.success) {
    throw new Error(
      result.message || "Failed to fetch rental requests"
    );
  }

  return result.data;
};