import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const API_URL =
  "https://rent-nest-backend-fiy9.onrender.com/api/user/update";

export async function PUT(request: Request) {
  try {
    const cookieStore = await cookies();

    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
        },
        { status: 401 }
      );
    }

    const body = await request.json();

    const response = await fetch(API_URL, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(body),
    });

    const text = await response.text();

    console.log("PUT backend status:", response.status);
    console.log("PUT backend response:", text);

    try {
      const data = JSON.parse(text);

      return NextResponse.json(data, {
        status: response.status,
      });
    } catch {
      return NextResponse.json(
        {
          success: false,
          message: "Backend returned invalid response",
          raw: text,
        },
        { status: 502 }
      );
    }
  } catch (error) {
    console.error("PUT profile error:", error);

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Failed to update profile",
      },
      { status: 500 }
    );
  }
}