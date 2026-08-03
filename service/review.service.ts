export interface ReviewTenant {
  id: string;
  name: string;
  email?: string;
}

export interface ReviewProperty {
  id: string;
  title: string;
  location: string;
}

export interface Review {
  id: string;
  rating: number;
  comment: string;
  tenantId: string;
  propertyId: string;
  createdAt: string;
  updatedAt: string;

  tenant: ReviewTenant;
  property: ReviewProperty;
}

interface ReviewsResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: Review[];
}

interface ReviewResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: Review;
}

interface CreateReviewData {
  rating: number;
  comment: string;
  propertyId: string;
}

export const getAllReviews = async (): Promise<Review[]> => {
  const response = await fetch("/api/review/all-reviews", {
    method: "GET",
    credentials: "include",
    cache: "no-store",
  });

  const result = await response.json();

  console.log("STATUS:", response.status);
  console.log("RESPONSE:", result);

  if (!response.ok || !result.success) {
    throw new Error(
      result.message || "Failed to fetch all reviews",
    );
  }

  return result.data;
};

export const getMyReviews =
  async (): Promise<Review[]> => {
    const response = await fetch(
      "/api/review/my-reviews",
      {
        method: "GET",
        credentials: "include",
        cache: "no-store",
      },
    );

    const result: ReviewsResponse =
      await response.json();

    if (!response.ok || !result.success) {
      throw new Error(
        result.message ||
          "Failed to fetch my reviews",
      );
    }

    return result.data;
  };

export const createReview =
  async (
    reviewData: CreateReviewData,
  ): Promise<Review> => {
    const response = await fetch(
      "/api/review/create",
      {
        method: "POST",
        credentials: "include",
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reviewData),
      },
    );

    const result: ReviewResponse =
      await response.json();

    if (!response.ok || !result.success) {
      throw new Error(
        result.message ||
          "Failed to create review",
      );
    }

    return result.data;
  };

export const updateReview =
  async (
    reviewId: string,
    reviewData: {
      rating: number;
      comment: string;
    },
  ): Promise<Review> => {
    const response = await fetch(
      `/api/review/user/${reviewId}`,
      {
        method: "PUT",
        credentials: "include",
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reviewData),
      },
    );

    const result: ReviewResponse =
      await response.json();

    if (!response.ok || !result.success) {
      throw new Error(
        result.message ||
          "Failed to update review",
      );
    }

    return result.data;
  };

export const deleteReview =
  async (
    reviewId: string,
  ): Promise<null> => {
    const response = await fetch(
      `/api/review/user/${reviewId}`,
      {
        method: "DELETE",
        credentials: "include",
        cache: "no-store",
      },
    );

    const result: {
      success: boolean;
      statusCode: number;
      message: string;
      data: null;
    } = await response.json();

    if (!response.ok || !result.success) {
      throw new Error(
        result.message ||
          "Failed to delete review",
      );
    }

    return result.data;
  };

  export const getAdminReviews = async (): Promise<Review[]> => {
  const response = await fetch(
    "/api/review/admin/all-reviews",
    {
      method: "GET",
      credentials: "include",
      cache: "no-store",
    },
  );

  const result: ReviewsResponse =
    await response.json();

  if (!response.ok || !result.success) {
    throw new Error(
      result.message ||
        "Failed to fetch admin reviews",
    );
  }

  return result.data;
};

export const adminDeleteReview = async (
  reviewId: string,
): Promise<null> => {
  const response = await fetch(
    `/api/review/admin/${reviewId}`,
    {
      method: "DELETE",
      credentials: "include",
      cache: "no-store",
    },
  );

  const result: {
    success: boolean;
    statusCode: number;
    message: string;
    data: null;
  } = await response.json();

  if (!response.ok || !result.success) {
    throw new Error(
      result.message ||
        "Failed to delete review",
    );
  }

  return result.data;
};