export interface Category {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  _count: {
    properties: number;
  };
}

interface CategoriesResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: Category[];
}

export const getAllCategories = async (): Promise<Category[]> => {
  const response = await fetch("/api/admin/categories", {
    credentials: "include",
    cache: "no-store",
  });

  const result: CategoriesResponse = await response.json();

  if (!response.ok || !result.success) {
    throw new Error(
      result.message || "Failed to fetch categories"
    );
  }

  return result.data;
};