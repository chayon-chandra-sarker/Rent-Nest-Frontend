"use server";

import { cookies } from "next/headers";

export const getNewAccessToken = async () => {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("refreshToken")?.value || null;
  if (!refreshToken) {
    return {
      success: false,
      message: "Refresh token not found",
      data: null,
    };
  }
  const res = await fetch(
    "https://rent-nest-backend-fiy9.onrender.com/api/auth/refresh-token",
    {
      method:"POST",
      headers: {
        // Authorization:`${accessToken}`,
        cookie: `refreshToken=${refreshToken}`,
      },
     cache: "no-cache"
    },
  );

  const result =await res.json();
  return result;
};
