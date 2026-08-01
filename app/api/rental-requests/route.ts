import { cookies } from "next/headers";
import { NextResponse } from "next/server";

// ========================================
// GET MY RENTAL REQUESTS
// ========================================

export async function GET() {
  try {
    const cookieStore = await cookies();

    const accessToken =
      cookieStore.get("accessToken")?.value;

    if (!accessToken) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
        },
        { status: 401 }
      );
    }

    const response = await fetch(
      "https://rent-nest-backend-fiy9.onrender.com/api/rental/requests",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        cache: "no-store",
      }
    );

    const data = await response.json();

    return NextResponse.json(data, {
      status: response.status,
    });
  } catch (error) {
    console.error(
      "My rental requests GET route error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch rental requests",
      },
      { status: 500 }
    );
  }
}

// ========================================
// CREATE RENTAL REQUEST
// ========================================

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies();

    const accessToken =
      cookieStore.get("accessToken")?.value;

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

    const { propertyId } = body;

    if (!propertyId) {
      return NextResponse.json(
        {
          success: false,
          message: "Property ID is required",
        },
        { status: 400 }
      );
    }

    const response = await fetch(
      "https://rent-nest-backend-fiy9.onrender.com/api/rental/create",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          propertyId,
        }),
      }
    );

    const text = await response.text();

    let data;

    try {
      data = JSON.parse(text);
    } catch {
      console.error(
        "Backend returned invalid JSON:",
        text
      );

      return NextResponse.json(
        {
          success: false,
          message:
            "Backend returned an invalid response",
        },
        { status: response.status || 500 }
      );
    }

    return NextResponse.json(data, {
      status: response.status,
    });
  } catch (error) {
    console.error(
      "Create rental request POST route error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message: "Failed to create rental request",
      },
      { status: 500 }
    );
  }
}