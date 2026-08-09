"use server";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const logOut = async () => {
  const cookieStore = await cookies();

  const accessToken = cookieStore.get("accessToken")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;

  try {
    await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/auth/logout`,
      {
        method: "POST",
        headers: {
          Cookie: `accessToken=${accessToken ?? ""}; refreshToken=${refreshToken ?? ""}`,
        },
        cache: "no-store",
      }
    );
  } catch (error) {
    console.error("Logout API error:", error);
  }

  // Next.js side cookie clear
  cookieStore.delete("accessToken");
  cookieStore.delete("refreshToken");

  revalidateTag("my-profile", "max");

  redirect("/login");
};