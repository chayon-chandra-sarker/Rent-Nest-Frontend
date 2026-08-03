import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL =  "https://rent-nest-backend-fiy9.onrender.com";

interface RouteContext {
  params: Promise<{
    requestId: string;
  }>;
}

export async function PUT(
  request: NextRequest,
  context: RouteContext,
) {
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

    const { requestId } = await context.params;

    if (!requestId) {
      return NextResponse.json(
        {
          success: false,
          message: "Request ID is required",
        },
        { status: 400 },
      );
    }

    const body = await request.json();

    const response = await fetch(
      `${BACKEND_URL}/api/landlord/status/${requestId}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
        cache: "no-store",
      },
    );

    const result = await response.json();

    return NextResponse.json(result, {
      status: response.status,
    });
  } catch (error) {
    console.error(
      "Update landlord request status error:",
      error,
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to update landlord request status",
      },
      { status: 500 },
    );
  }
}