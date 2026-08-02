import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const BACKEND_URL =
  "https://rent-nest-backend-fiy9.onrender.com";

export async function DELETE(
  request: Request,
  context: {
    params: Promise<{ id: string }>;
  }
) {
  try {
    const { id } = await context.params;

    const cookieStore = await cookies();

    const accessToken =
      cookieStore.get("accessToken")?.value;

    if (!accessToken) {
      return NextResponse.json(
        {
          success: false,
          statusCode: 401,
          message: "You are not logged in.",
        },
        {
          status: 401,
        }
      );
    }

    const response = await fetch(
      `${BACKEND_URL}/api/property/delete/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        cache: "no-store",
      }
    );

    const result = await response.json();

    return NextResponse.json(result, {
      status: response.status,
    });
  } catch (error) {
    console.error("Delete property proxy error:", error);

    return NextResponse.json(
      {
        success: false,
        statusCode: 500,
        message: "Failed to delete property",
      },
      {
        status: 500,
      }
    );
  }
}