
export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: "TENANT" | "LANDLORD" | "ADMIN";
  status: string;
  phone: string | null;
  image: string | null;
  address: string | null;
  createdAt: string;
  updatedAt: string;
}

interface ProfileResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: UserProfile;
}

export const getMyProfile = async (): Promise<UserProfile> => {
  const response = await fetch("/api/auth/me", {
    method: "GET",
    credentials: "include",
    cache: "no-store",
  });

  const result: ProfileResponse = await response.json();

  if (!response.ok || !result.success) {
    throw new Error(
      result.message || "Failed to fetch profile"
    );
  }

  return result.data;
};


export interface UpdateProfileData {
  name?: string;
  phone?: string;
  image?: string;
  address?: string;
}

interface UpdateProfileResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: UserProfile;
}

export const updateProfile = async (
  data: UpdateProfileData,
): Promise<UserProfile> => {
  const response = await fetch("/api/user/update", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(data),
  });

  const contentType = response.headers.get("content-type");

  if (!contentType?.includes("application/json")) {
    throw new Error(
      `Invalid response from server. Status: ${response.status}`,
    );
  }

  const result: UpdateProfileResponse = await response.json();

  if (!response.ok || !result.success) {
    throw new Error(
      result.message || "Failed to update profile",
    );
  }

  return result.data;
};



