import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const BACKEND_URL =
  "https://rent-nest-backend-fiy9.onrender.com";

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
        { status: 401 }
      );
    }

    const response = await fetch(
      `${BACKEND_URL}/api/rental/landlord/requests`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        cache: "no-store",
      }
    );

    const text = await response.text();

    let result;

    try {
      result = JSON.parse(text);
    } catch {
      console.error(
        "Backend returned non-JSON:",
        text
      );

      return NextResponse.json(
        {
          success: false,
          statusCode: response.status,
          message:
            "Backend returned an invalid response",
        },
        { status: response.status }
      );
    }

    return NextResponse.json(result, {
      status: response.status,
    });
  } catch (error) {
    console.error(
      "Landlord rental requests error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        statusCode: 500,
        message: "Failed to fetch rental requests",
      },
      { status: 500 }
    );
  }
}