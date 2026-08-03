import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL =
  "https://rent-nest-backend-fiy9.onrender.com";

export async function POST(request: NextRequest) {
  try {
    const accessToken =
      request.cookies.get("accessToken")?.value;

    if (!accessToken) {
      return NextResponse.json(
        {
          success: false,
          statusCode: 401,
          message: "Unauthorized",
          data: null,
        },
        { status: 401 },
      );
    }

    const response = await fetch(
      `${BACKEND_URL}/api/landlord/request`,
      {
        method: "POST",
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
      "Create landlord request route error:",
      error,
    );

    return NextResponse.json(
      {
        success: false,
        statusCode: 500,
        message: "Failed to submit landlord request",
        data: null,
      },
      { status: 500 },
    );
  }
}