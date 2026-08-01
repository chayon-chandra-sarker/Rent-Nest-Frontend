import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL =
  "https://rent-nest-backend-fiy9.onrender.com/api/user/update";

export async function PUT(request: NextRequest) {
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


    const response = await fetch(BACKEND_URL, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(body),
      cache: "no-store",
    });


    const result = await response.json();

  

    return NextResponse.json(result, {
      status: response.status,
    });
  } catch (error) {
    console.error("Update profile route error:", error);

    return NextResponse.json(
      {
        success: false,
        statusCode: 500,
        message: "Failed to update profile",
      },
      { status: 500 },
    );
  }
}