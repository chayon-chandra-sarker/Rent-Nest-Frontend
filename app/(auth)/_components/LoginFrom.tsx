
"use client";

import { useActionState, useEffect, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { GoogleLogin } from "@react-oauth/google";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { loginAction } from "../_actions/authAction";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const LoginFrom = () => {
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [state, action, pending] = useActionState(loginAction, {
    success: false,
    message: "",
    errors: {},
  });

  const router = useRouter();


  useEffect(() => {
    if (!state.message) return;

    if (state.success) {
      toast.success(state.message || "Login successfully");

    } else {
      toast.error(state.message || "Login failed");
    }
  }, [state, router]);


const handleGoogleLogin = async (credential: string) => {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    console.log("API URL:", apiUrl);

    if (!apiUrl) {
      throw new Error("NEXT_PUBLIC_API_URL is not configured");
    }

    const response = await fetch(
      `${apiUrl}/api/auth/google`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          idToken: credential,
        }),
      }
    );

    console.log("Status:", response.status);
    console.log("Request URL:", response.url);

    const contentType = response.headers.get("content-type");

    if (!contentType?.includes("application/json")) {
      const text = await response.text();

      console.error("Non-JSON response:", text);

      throw new Error(
        `Server returned ${response.status}. Please check API URL.`
      );
    }

    const result = await response.json();

    console.log("Google Login Response:", result);

    if (!response.ok) {
      throw new Error(
        result?.message || "Google login failed"
      );
    }

    toast.success(
      result?.message || "Google login successful"
    );

    router.push("/dashboard");
    router.refresh();
  } catch (error) {
    console.error("Google Login Error:", error);

    toast.error(
      error instanceof Error
        ? error.message
        : "Google login failed"
    );
  }
};

  return (
    <div className="w-full">
     
      <form action={action} className="space-y-5">
        {/* Email Field */}
        <div className="space-y-2">
          <Label
            htmlFor="email"
            className="text-xs font-semibold text-gray-700"
          >
            Email Address
          </Label>

          <Input
            id="email"
            name="email"
            type="email"
            placeholder="name@company.com"
            value={formData.email}
            onChange={(e) =>
              setFormData({
                ...formData,
                email: e.target.value,
              })
            }
            className={`bg-gray-50 border-gray-300 focus-visible:ring-cyan-500 h-10 ${
              state.errors?.email
                ? "border-red-500"
                : ""
            }`}
          />

          {state.errors?.email && (
            <p className="text-xs text-red-500">
              {state.errors.email[0]}
            </p>
          )}
        </div>

        {/* Password Field */}
        <div className="space-y-2">
          <Label
            htmlFor="password"
            className="text-xs font-semibold text-gray-700"
          >
            Password
          </Label>

          <div className="relative">
            <Input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter Your Password"
              value={formData.password}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  password: e.target.value,
                })
              }
              className={`bg-gray-50 border-gray-300 focus-visible:ring-cyan-500 h-10 pr-10 ${
                state.errors?.password
                  ? "border-red-500"
                  : ""
              }`}
            />

            <button
              type="button"
              onClick={() =>
                setShowPassword(!showPassword)
              }
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              {showPassword ? (
                <EyeOff size={18} />
              ) : (
                <Eye size={18} />
              )}
            </button>
          </div>

          {state.errors?.password && (
            <p className="text-xs text-red-500">
              {state.errors.password[0]}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={pending}
          className="w-full rounded-full bg-[#00E5E5] text-gray-900 hover:bg-[#00D0D0] font-semibold h-11 transition-all mt-2"
        >
          {pending
            ? "Submitting..."
            : "Login to Account"}
        </Button>
      </form>

      <div className="flex items-center gap-3 my-6">
        <div className="h-px flex-1 bg-gray-200" />

        <span className="text-xs text-gray-400">
          OR
        </span>

        <div className="h-px flex-1 bg-gray-200" />
      </div>

      <div className="flex justify-center">
        <GoogleLogin
          onSuccess={(credentialResponse) => {
            const credential =
              credentialResponse.credential;

            if (!credential) {
              toast.error(
                "Google ID token not found"
              );
              return;
            }

            handleGoogleLogin(credential);
          }}
          onError={() => {
            toast.error("Google login failed");
          }}
          useOneTap={false}
        />
      </div>
    </div>
  );
};

export default LoginFrom;

