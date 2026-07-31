import { cookies } from "next/headers";

export async function getMyProfile() {
  try {
    const cookieStore = await cookies();

    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
      throw new Error("Unauthorized");
    }

    const response = await fetch(
      "https://rent-nest-backend-fiy9.onrender.com/api/user/me",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        cache: "no-store",
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data?.message || "Failed to fetch profile"
      );
    }

    return data;
  } catch (error) {
    console.error("Get profile error:", error);

    throw new Error("Failed to fetch profile");
  }
}