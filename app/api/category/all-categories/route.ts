import { NextResponse } from "next/server";

const BACKEND_URL =
  "https://rent-nest-backend-fiy9.onrender.com";

export async function GET() {
  try {
    const response = await fetch(
      `${BACKEND_URL}/api/category/all-categories`,
      {
        method: "GET",
        cache: "no-store",
      },
    );

    const result = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        {
          success: false,
          statusCode: response.status,
          message:
            result.message ||
            "Failed to fetch categories",
          data: [],
        },
        {
          status: response.status,
        },
      );
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error(
      "Public categories API error:",
      error,
    );

    return NextResponse.json(
      {
        success: false,
        statusCode: 500,
        message: "Failed to fetch categories",
        data: [],
      },
      {
        status: 500,
      },
    );
  }
}