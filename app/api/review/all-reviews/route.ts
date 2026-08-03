import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await fetch(
      "https://rent-nest-backend-fiy9.onrender.com/api/review/all-reviews",
      {
        method: "GET",
        cache: "no-store",
      },
    );

    const result = await response.json();

    return NextResponse.json(result, {
      status: response.status,
    });
  } catch (error) {
    console.error("Get all reviews API error:", error);

    return NextResponse.json(
      {
        success: false,
        statusCode: 500,
        message: "Failed to get all reviews",
      },
      { status: 500 },
    );
  }
}