export interface PublicCategory {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  _count: {
    properties: number;
  };
}

interface PublicCategoriesResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: PublicCategory[];
}

export const getPublicCategories =
  async (): Promise<PublicCategory[]> => {
    const response = await fetch(
      "/api/category/all-categories",
      {
        cache: "no-store",
      },
    );

    const result: PublicCategoriesResponse =
      await response.json();

    if (!response.ok || !result.success) {
      throw new Error(
        result.message ||
          "Failed to fetch categories",
      );
    }

    return result.data;
  };