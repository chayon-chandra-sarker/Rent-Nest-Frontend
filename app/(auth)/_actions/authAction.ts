"use server";

import { cookies } from "next/headers";
import { loginSchema } from "../_schemas/loginSchema";

type LoginState = {
  success: boolean;
  statusCode?: number;
  message: string;
  data?: {
    accessToken: string;
    refreshToken: string;
  };
  errors?: {
    email?: string[];
    password?: string[];
  };
};

export const loginAction = async (
  prevState: LoginState,
  formData: FormData
): Promise<LoginState> => {
  // Get form data
  const email = formData.get("email");
  const password = formData.get("password");

  // Zod validation
  const validation = loginSchema.safeParse({
    email,
    password,
  });

  // Validation failed
  if (!validation.success) {
    return {
      success: false,
      message: "Please fix the errors",
      errors: validation.error.flatten().fieldErrors,
    };
  }

  // Validated payload
  const payload = validation.data;

  try {
    // Login API
    const res = await fetch(
      "https://rent-nest-backend-fiy9.onrender.com/api/auth/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    const result = await res.json();

    // Login success
    if (result.success) {
      const cookieStore = await cookies();

      cookieStore.set("accessToken", result.data.accessToken, {
        httpOnly: true,
        maxAge: 60 * 60 * 24,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        path: "/",
      });

      cookieStore.set("refreshToken", result.data.refreshToken, {
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 7,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        path: "/",
      });

      return result;
    }

    // Backend login error
    return {
      success: false,
      statusCode: result.statusCode,
      message: result.message || "Invalid email or password",
    };
  } catch (error) {
    console.error("Login error:", error);

    return {
      success: false,
      message: "Something went wrong. Please try again.",
    };
  }
};