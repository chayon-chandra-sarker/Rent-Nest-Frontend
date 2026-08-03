import { cookies } from "next/headers";
import { NextResponse } from "next/server";

interface RouteParams {
  params: Promise<{
    reviewId: string;
  }>;
}

export async function PUT(
  request: Request,
  { params }: RouteParams,
) {
  try {
    const { reviewId } = await params;

    const cookieStore = await cookies();

    const accessToken = cookieStore.get("accessToken")?.value;

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

    const body = await request.json();

    const response = await fetch(
      `https://rent-nest-backend-fiy9.onrender.com/api/review/user/${reviewId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
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
    console.error("Update review API error:", error);

    return NextResponse.json(
      {
        success: false,
        statusCode: 500,
        message: "Failed to update review",
      },
      { status: 500 },
    );
  }
}

export async function DELETE(
  _request: Request,
  { params }: RouteParams,
) {
  try {
    const { reviewId } = await params;

    const cookieStore = await cookies();

    const accessToken = cookieStore.get("accessToken")?.value;

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
      `https://rent-nest-backend-fiy9.onrender.com/api/review/user/${reviewId}`,
      {
        method: "DELETE",
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
    console.error("Delete review API error:", error);

    return NextResponse.json(
      {
        success: false,
        statusCode: 500,
        message: "Failed to delete review",
      },
      { status: 500 },
    );
  }
}