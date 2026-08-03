import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL =  "https://rent-nest-backend-fiy9.onrender.com";

export async function GET(request: NextRequest) {
  try {
    const accessToken =
      request.cookies.get("accessToken")?.value;

    if (!accessToken) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
        },
        { status: 401 },
      );
    }

    const response = await fetch(
      `${BACKEND_URL}/api/landlord/all-requests`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
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
      "Get all landlord requests error:",
      error,
    );

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch landlord requests",
      },
      { status: 500 },
    );
  }
}