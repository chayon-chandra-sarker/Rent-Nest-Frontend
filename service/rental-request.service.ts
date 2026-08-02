export interface RentalRequest {
  id: string;
  propertyId: string;
  tenantId: string;

  status:
    | "PENDING"
    | "APPROVED"
    | "REJECTED"
    | "ACTIVE"
    | "COMPLETED";

  requestedAt: string;
  approvedAt: string | null;

  tenant: {
    id: string;
    name: string;
    email: string;
    phone: string | null;
    status?: string;
    role?: string;
    image?: string | null;
    address?: string | null;
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

    image: string | null;

    isAvailable: boolean;

    createdAt: string;
    updatedAt: string;

    landlord?: {
      id: string;
      name: string;
      email: string;
      phone?: string | null;
      image?: string | null;
    };

    category?: {
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

interface RentalRequestResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: RentalRequest;
}


interface CreateRentalRequestData {
  propertyId: string;
}


export interface UpdateRentalRequestData {
  status: "APPROVED" | "REJECTED";
}

export const getAllRentalRequests = async (): Promise<
  RentalRequest[]
> => {
  const response = await fetch(
    "/api/admin/rental-requests",
    {
      method: "GET",
      credentials: "include",
      cache: "no-store",
    }
  );

  const result: RentalRequestsResponse =
    await response.json();

  if (!response.ok || !result.success) {
    throw new Error(
      result.message ||
        "Failed to fetch rental requests"
    );
  }

  return result.data;
};

export const createRentalRequest = async (
  propertyId: string
): Promise<RentalRequest> => {
  const data: CreateRentalRequestData = {
    propertyId,
  };

  const response = await fetch(
    "/api/rental-requests",
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      credentials: "include",

      body: JSON.stringify(data),
    }
  );

  const result: RentalRequestResponse =
    await response.json();

  if (!response.ok || !result.success) {
    throw new Error(
      result.message ||
        "Failed to create rental request"
    );
  }

  return result.data;
};

export type MyRentalRequest = RentalRequest;

export const getMyRentalRequests = async (): Promise<
  MyRentalRequest[]
> => {
  const response = await fetch(
    "/api/rental-requests",
    {
      method: "GET",
      credentials: "include",
      cache: "no-store",
    }
  );

  const result: RentalRequestsResponse =
    await response.json();

  if (!response.ok || !result.success) {
    throw new Error(
      result.message ||
        "Failed to fetch my rental requests"
    );
  }

  return result.data;
};

export const updateRentalRequest = async (
  id: string,
  status: "APPROVED" | "REJECTED"
): Promise<RentalRequest> => {
  const data: UpdateRentalRequestData = {
    status,
  };

  const response = await fetch(
    `/api/rental/update/${id}`,
    {
      method: "PUT",

      headers: {
        "Content-Type": "application/json",
      },

      credentials: "include",

      body: JSON.stringify(data),
    }
  );

  const result: RentalRequestResponse =
    await response.json();

  if (!response.ok || !result.success) {
    throw new Error(
      result.message ||
        "Failed to update rental request"
    );
  }

  return result.data;
};

export const getLandlordRentalRequests = async (): Promise<
  RentalRequest[]
> => {
  const response = await fetch(
    "/api/rental/landlord/requests",
    {
      method: "GET",
      credentials: "include",
      cache: "no-store",
    }
  );

  const result: RentalRequestsResponse =
    await response.json();

  if (!response.ok || !result.success) {
    throw new Error(
      result.message ||
        "Failed to fetch landlord rental requests"
    );
  }

  return result.data;
};