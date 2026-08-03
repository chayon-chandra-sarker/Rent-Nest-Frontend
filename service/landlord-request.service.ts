export interface LandlordRequestUser {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  image?: string | null;
  address?: string | null;
  role: "TENANT" | "LANDLORD" | "ADMIN";
  status: string;
  createdAt: string;
}

export interface LandlordRequest {
  id: string;
  userId: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  createdAt: string;
  updatedAt: string;
  user: LandlordRequestUser;
}

interface LandlordRequestsResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: LandlordRequest[];
}

interface LandlordRequestResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: LandlordRequest;
}

export const createLandlordRequest =
  async (): Promise<LandlordRequest> => {
    const response = await fetch(
      "/api/landlord/request",
      {
        method: "POST",
        credentials: "include",
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    const result: LandlordRequestResponse =
      await response.json();

    if (!response.ok || !result.success) {
      throw new Error(
        result.message ||
          "Failed to submit landlord request",
      );
    }

    return result.data;
  };

export const getAllLandlordRequests =
  async (): Promise<LandlordRequest[]> => {
    const response = await fetch(
      "/api/landlord/all-requests",
      {
        method: "GET",
        credentials: "include",
        cache: "no-store",
      },
    );

    const result: LandlordRequestsResponse =
      await response.json();

    if (!response.ok || !result.success) {
      throw new Error(
        result.message ||
          "Failed to fetch landlord requests",
      );
    }

    return result.data;
  };

export const updateLandlordRequestStatus =
  async (
    requestId: string,
    status: "APPROVED" | "REJECTED",
  ): Promise<LandlordRequest> => {
    const response = await fetch(
      `/api/landlord/status/${requestId}`,
      {
        method: "PUT",
        credentials: "include",
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status,
        }),
      },
    );

    const result: LandlordRequestResponse =
      await response.json();

    if (!response.ok || !result.success) {
      throw new Error(
        result.message ||
          "Failed to update landlord request",
      );
    }

    return result.data;
  };