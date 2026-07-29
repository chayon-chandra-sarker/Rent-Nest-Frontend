"use server";

import { cookies } from "next/headers";
import { loginSchema } from "../_schemas/loginSchema";
import jwt, { JwtPayload } from "jsonwebtoken";
import { redirect } from "next/navigation";

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
  const validation = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validation.success) {
    return {
      success: false,
      message: "Please fix the errors",
      errors: validation.error.flatten().fieldErrors,
    };
  }

  const payload = validation.data;

  let result;

  try {
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

    result = await res.json();
  } catch (error) {
    console.error("Login API error:", error);

    return {
      success: false,
      message: "Unable to connect to server",
    };
  }

  // Backend error
  if (!result.success) {
    return {
      success: false,
      statusCode: result.statusCode,
      message: result.message || "Invalid email or password",
    };
  }

  // Set cookies
  const cookieStore = await cookies();

  cookieStore.set("accessToken", result.data.accessToken, {
    httpOnly: true,
    maxAge: 60 * 60 * 24,
    sameSite: "lax",
  
  });

  cookieStore.set("refreshToken", result.data.refreshToken, {
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 7,
    sameSite: "lax",
  
  });

  // Decode token
  const decodedToken = jwt.decode(
    result.data.accessToken
  ) as JwtPayload | null;

  const role = decodedToken?.role;

  // Redirect dashboard
  if (role === "TENANT") {
    redirect("/dashboard");
  }

  if (role === "ADMIN") {
    redirect("/admin-dashboard");
  }

  if (role === "LANDLORD") {
    redirect("/land-lord-dashboard");
  }

  return {
    success: false,
    message: "Invalid user role",
  };
};