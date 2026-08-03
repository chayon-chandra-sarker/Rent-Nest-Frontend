import { cookies } from "next/headers";
import { NextResponse } from "next/server";

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
        { status: 401 },
      );
    }

    const body = await request.json();

    const { sessionId } = body;

    if (!sessionId) {
      return NextResponse.json(
        {
          success: false,
          message: "Stripe session ID is required",
        },
        { status: 400 },
      );
    }

    const response = await fetch(
      "https://rent-nest-backend-fiy9.onrender.com/api/payment/verify-session",
      {
        method: "POST",

        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          sessionId,
        }),

        cache: "no-store",
      },
    );

    const text = await response.text();

    console.log(
      "Verify payment backend status:",
      response.status,
    );

    console.log(
      "Verify payment backend response:",
      text,
    );

    let result;

    try {
      result = JSON.parse(text);
    } catch {
      return NextResponse.json(
        {
          success: false,
          message: "Backend returned invalid JSON",
          backendResponse: text,
        },
        { status: 502 },
      );
    }

    return NextResponse.json(result, {
      status: response.status,
    });
  } catch (error) {
    console.error(
      "Payment verification API error:",
      error,
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to verify payment",
      },
      { status: 500 },
    );
  }
}