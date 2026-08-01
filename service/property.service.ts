export type AdminProperty = {
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
    phone: string | null;
    image: string | null;
  };

  category: {
    id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
  };
};

type GetAllPropertiesResponse = {
  success: boolean;
  statusCode: number;
  message: string;
  data: AdminProperty[];
};

export const getAllProperties = async (): Promise<AdminProperty[]> => {
  const response = await fetch("/api/admin/properties", {
    credentials: "include",
  });

  const result: GetAllPropertiesResponse = await response.json();

  if (!response.ok || !result.success) {
    throw new Error(
      result.message || "Failed to fetch properties"
    );
  }

  return result.data;
};