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
      headers: {
        // Authorization:`${accessToken}`,
        cookie: `accessToken=${accessToken}`,
      },
     cache: "force-cache",
      next: {
        revalidate: 60 * 60 * 24,
        tags:["my-profile"]
      },
    },
  );

  const result = res.json();
  return result;
};
