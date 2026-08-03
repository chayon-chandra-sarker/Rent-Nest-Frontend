import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const cookieStore = await cookies();

    const accessToken =
      cookieStore.get("accessToken")?.value;

    if (!accessToken) {
      return NextResponse.json(
        {
          success: false,
          statusCode: 401,
          message: "Unauthorized",
        },
        { status: 401 },
      );
    }

    const response = await fetch(
      "https://rent-nest-backend-fiy9.onrender.com/api/review/admin/all-reviews",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        cache: "no-store",
      },
    );

    const result = await response.json();

    return NextResponse.json(result, {
      status: response.status,
    });
  } catch (error) {
    console.error(
      "Get admin reviews API error:",
      error,
    );

    return NextResponse.json(
      {
        success: false,
        statusCode: 500,
        message: "Failed to fetch reviews",
      },
      { status: 500 },
    );
  }
}