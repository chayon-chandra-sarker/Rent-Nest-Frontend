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

type GetSinglePropertyResponse = {
  success: boolean;
  statusCode: number;
  message: string;
  data: AdminProperty;
};

// ===============================
// Get All Admin Properties
// ===============================
export const getAllProperties = async (): Promise<AdminProperty[]> => {
  const response = await fetch("/api/admin/properties", {
    method: "GET",
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

// ===============================
// Get All Tenant Properties
// ===============================
export const getTenantProperties = async (): Promise<
  AdminProperty[]
> => {
  const response = await fetch(
    "https://rent-nest-backend-fiy9.onrender.com/api/property/all-properties",
    {
      method: "GET",
      cache: "no-store",
    }
  );

  const result: GetAllPropertiesResponse =
    await response.json();

  if (!response.ok || !result.success) {
    throw new Error(
      result.message || "Failed to fetch properties"
    );
  }

  return result.data;
};

// ===============================
// Get Single Property
// ===============================
export const getSingleProperty = async (
  id: string
): Promise<AdminProperty> => {
  const response = await fetch(
    `https://rent-nest-backend-fiy9.onrender.com/api/property/single/${id}`,
    {
      method: "GET",
      cache: "no-store",
    }
  );

  const result: GetSinglePropertyResponse =
    await response.json();

  if (!response.ok || !result.success) {
    throw new Error(
      result.message || "Failed to fetch property"
    );
  }

  return result.data;
};