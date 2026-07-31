"use server";

import { cookies } from "next/headers";

export const getMe = async () => {
  const cookieStore = await cookies();

  const accessToken = cookieStore.get("accessToken")?.value || null;

  if (!accessToken) {
    return {
      success: false,
      message: "User not logged in",
      data: null,
    };
  }

  const res = await fetch(
    "https://rent-nest-backend-fiy9.onrender.com/api/user/me",
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      cache: "no-store",
    }
  );

  if (!res.ok) {
    return {
      success: false,
      message: "Failed to fetch user profile",
      data: null,
    };
  }

  const result = await res.json();

  return result;
};