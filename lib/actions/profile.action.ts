"use server";

import { cookies } from "next/headers";

export async function updateMyProfile(name: string) {
  try {
    const cookieStore = await cookies();

    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
      throw new Error("Unauthorized");
    }

    const response = await fetch(
      "https://rent-nest-backend-fiy9.onrender.com/api/user/me",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          name,
        }),
      }
    );

    const data = await response.json();

    console.log("PUT Profile Response:", {
      status: response.status,
      data,
    });

    if (!response.ok) {
      throw new Error(
        data?.message || `Request failed with status ${response.status}`
      );
    }

    return data;
  } catch (error) {
    console.error("Update profile error:", error);

    if (error instanceof Error) {
      throw new Error(error.message);
    }

    throw new Error("Failed to update profile");
  }
}