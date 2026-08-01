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
    credentials: "include",
    cache: "no-store",
  });

  const result: ProfileResponse = await response.json();

  if (!response.ok || !result.success) {
    throw new Error(result.message || "Failed to fetch profile");
  }

  return result.data;
};