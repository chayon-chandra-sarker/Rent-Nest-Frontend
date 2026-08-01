import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {

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
      "https://rent-nest-backend-fiy9.onrender.com/api/review/create",
      {
        method: "POST",
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
    console.error("Create review API error:", error);

    return NextResponse.json(
      {
        success: false,
        statusCode: 500,
        message: "Failed to create review",
      },
      { status: 500 },
    );
  }
}