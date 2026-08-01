export interface Review {
  id: string;
  rating: number;
  comment: string;
  tenantId: string;
  propertyId: string;
  createdAt: string;
  updatedAt: string;

  tenant: {
    id: string;
    name: string;
    email: string;
  };

  property: {
    id: string;
    title: string;
    location: string;
  };
}

export interface CreateReviewData {
  rating: number;
  comment: string;
  propertyId: string;
}

interface CreateReviewResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: Review;
}

export const createReview = async (
  data: CreateReviewData,
): Promise<Review> => {
  const response = await fetch("/api/review/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(data),
  });

  const result: CreateReviewResponse = await response.json();

  if (!response.ok || !result.success) {
    throw new Error(
      result.message || "Failed to create review",
    );
  }

  return result.data;
};