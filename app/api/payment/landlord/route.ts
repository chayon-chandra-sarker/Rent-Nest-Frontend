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
        { status: 401 },
      );
    }

    const response = await fetch(
      `${BACKEND_URL}/api/payment/landlord-payments`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        cache: "no-store",
      },
    );

    const text = await response.text();

    let result;

    try {
      result = JSON.parse(text);
    } catch {
      console.error(
        "Backend returned invalid JSON:",
        text,
      );

      return NextResponse.json(
        {
          success: false,
          statusCode: response.status,
          message:
            "Backend returned an invalid response",
        },
        { status: response.status },
      );
    }

    return NextResponse.json(result, {
      status: response.status,
    });
  } catch (error) {
    console.error(
      "Landlord payments API error:",
      error,
    );

    return NextResponse.json(
      {
        success: false,
        statusCode: 500,
        message: "Failed to fetch landlord payments",
      },
      { status: 500 },
    );
  }
}