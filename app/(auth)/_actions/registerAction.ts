"use server";

import { registerSchema } from "../_schemas/registerSchema";
export type RegisterState = {
  success: boolean;
  statusCode?: number;
  message: string;
  data?: unknown;
  errors?: {
    name?: string[];
    email?: string[];
    password?: string[];
  };
};
export const registerAction = async (prevState: RegisterState, formData: FormData) => {
  //Zod validation
  const validation = registerSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  //  Zod validation error
  if (!validation.success) {
    return {
      success: false,
      message: "Please fix the errors",
      errors: validation.error.flatten().fieldErrors,
    };
  }

  //  Validated data
  const payload = validation.data;

  try {
    // Register API
    const res = await fetch(
      "https://rent-nest-backend-fiy9.onrender.com/api/auth/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      },
    );

    //  API response
    const result = await res.json();

    //  Backend error
    if (!res.ok) {
      return {
        success: false,
        statusCode: res.status,
        message: result.message || "Registration failed",
        errors: {},
      };
    }

    // Registration success
    return {
      success: true,
      statusCode: res.status,
      message: result.message || "Registration successful",
      data: result.data,
      errors: {},
    };
  } catch (error) {
    // Network / unexpected error
    console.error("Register error:", error);

    return {
      success: false,
      message: "Something went wrong. Please try again.",
      errors: {},
    };
  }
};
