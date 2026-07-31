export interface UpdateProfileData {
  name?: string;
  phone?: string;
  image?: string;
  address?: string;
}

export const updateProfile = async (
  data: UpdateProfileData
) => {
  const response = await fetch("/api/user/update", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to update profile");
  }

  return response.json();
};