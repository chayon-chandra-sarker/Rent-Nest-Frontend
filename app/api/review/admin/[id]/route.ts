import { cookies } from "next/headers";
import { NextResponse } from "next/server";

interface RouteContext {
  params: Promise<{
    id: string;
  }>;
}

export async function DELETE(
  _request: Request,
  { params }: RouteContext,
) {
  try {
    const { id } = await params;

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
      `https://rent-nest-backend-fiy9.onrender.com/api/review/admin/${id}`,
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
    console.error(
      "Admin delete review API error:",
      error,
    );

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