
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

    // Get rentalRequestId from frontend
    const body = await request.json();

    const { rentalRequestId } = body;

    if (!rentalRequestId) {
      return NextResponse.json(
        {
          success: false,
          message: "Rental request ID is required",
        },
        { status: 400 },
      );
    }

    const response = await fetch(
      "https://rent-nest-backend-fiy9.onrender.com/api/payment/checkout",
      {
        method: "POST",

        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          rentalRequestId,
        }),

        cache: "no-store",
      },
    );

    const text = await response.text();

    console.log(
      "Backend status:",
      response.status,
    );

    console.log(
      "Backend response:",
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
      "Checkout API error:",
      error,
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to create checkout session",
      },
      { status: 500 },
    );
  }
}

