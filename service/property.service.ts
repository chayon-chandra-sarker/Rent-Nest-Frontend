

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

interface LandlordPropertiesResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: LandlordProperty[];
}

interface PropertyResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: LandlordProperty;
}

interface DeletePropertyResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: null;
}

export interface CreatePropertyData {
  categoryId: string;
  title: string;
  description: string;
  location: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  amenities: string[];
  image: string;
}

interface CreatePropertyResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: LandlordProperty;
}

export interface UpdatePropertyData {
  categoryId: string;
  title: string;
  description: string;
  location: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  amenities: string[];
  image: string | null;
  isAvailable: boolean;
}

interface UpdatePropertyResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: LandlordProperty;
}

export const getAllProperties = async (): Promise<
  AdminProperty[]
> => {
  const response = await fetch("/api/admin/properties", {
    method: "GET",
    credentials: "include",
    cache: "no-store",
  });

  const result: GetAllPropertiesResponse =
    await response.json();

  if (!response.ok || !result.success) {
    throw new Error(
      result.message || "Failed to fetch properties"
    );
  }

  return result.data;
};


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


export const getLandlordProperties = async (): Promise<
  LandlordProperty[]
> => {
  const response = await fetch(
         "https://rent-nest-backend-fiy9.onrender.com/api/property/my-properties",
    {
      method: "GET",
      cache: "no-store",
    }
  );

  const result: LandlordPropertiesResponse =
    await response.json();

  if (!response.ok || !result.success) {
    throw new Error(
      result.message || "Failed to fetch landlord properties"
    );
  }

  return result.data;
};

export const createProperty = async (
  data: CreatePropertyData
): Promise<LandlordProperty> => {
  const response = await fetch("/api/property/create", {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    credentials: "include",

    body: JSON.stringify(data),
  });

  const result: CreatePropertyResponse =
    await response.json();

  if (!response.ok || !result.success) {
    throw new Error(
      result.message || "Failed to create property"
    );
  }

  return result.data;
};

export const updateProperty = async (
  id: string,
  data: UpdatePropertyData
): Promise<LandlordProperty> => {
  const response = await fetch(
    `/api/property/update/${id}`,
    {
      method: "PUT",

      headers: {
        "Content-Type": "application/json",
      },

      credentials: "include",

      body: JSON.stringify(data),
    }
  );

  const result: UpdatePropertyResponse =
    await response.json();

  if (!response.ok || !result.success) {
    throw new Error(
      result.message || "Failed to update property"
    );
  }

  return result.data;
};

export const deleteProperty = async (
  id: string
): Promise<void> => {
  const response = await fetch(
    `/api/property/delete/${id}`,
    {
      method: "DELETE",
      credentials: "include",
      cache: "no-store",
    }
  );

  const result: DeletePropertyResponse =
    await response.json();

  if (!response.ok || !result.success) {
    throw new Error(
      result.message || "Failed to delete property"
    );
  }
};



