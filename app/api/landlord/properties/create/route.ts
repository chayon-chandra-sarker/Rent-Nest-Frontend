import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL =
  "https://rent-nest-backend-fiy9.onrender.com";

export async function POST(request: NextRequest) {
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
        { status: 401 }
      );
    }

    const body = await request.json();

    const response = await fetch(
      `${BACKEND_URL}/api/property/create`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );

    const result = await response.json();

    if (!response.ok || !result.success) {
      return NextResponse.json(
        {
          success: false,
          statusCode: response.status,
          message:
            result.message ||
            "Failed to create property",
          data: result.data ?? null,
        },
        { status: response.status }
      );
    }

    return NextResponse.json(
      {
        success: true,
        statusCode: 201,
        message:
          result.message ||
          "Property created successfully",
        data: result.data,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(
      "Create property API error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        statusCode: 500,
        message: "Internal server error",
      },
      { status: 500 }
    );
  }
}