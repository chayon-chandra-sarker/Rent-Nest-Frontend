export interface LandlordProperty {
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

interface LandlordPropertiesResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: LandlordProperty[];
};

export interface CreatePropertyData {
  categoryId: string;
  title: string;
  description: string;
  location: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  amenities: string[];
  isAvailable: boolean;
};

interface CreatePropertyResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: LandlordProperty;
};


export const getLandlordProperties =
  async (): Promise<LandlordProperty[]> => {
    const response = await fetch(
      "/api/landlord/properties",
      {
        method: "GET",
        credentials: "include",
        cache: "no-store",
      }
    );

    const result: LandlordPropertiesResponse =
      await response.json();

    if (!response.ok || !result.success) {
      throw new Error(
        result.message ||
          "Failed to fetch landlord properties"
      );
    }

    return result.data;
  };

export const createLandlordProperty = async (
  data: CreatePropertyData
): Promise<LandlordProperty> => {
  const response = await fetch(
    "/api/landlord/properties/create",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(data),
    }
  );

  const result: CreatePropertyResponse =
    await response.json();

  if (!response.ok || !result.success) {
    throw new Error(
      result.message ||
        "Failed to create property"
    );
  }

  return result.data;
};