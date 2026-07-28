"use client"
import React from "react";

const LoginFooter = () => {
  return (
    <div>
      {/* Footer */}
      <p className="text-center text-xs text-gray-500 pt-2">
        Don&apos;t have an account?{" "}
        <a href="#" className="font-bold text-teal-600 hover:underline">
          Sign up
        </a>
      </p>
    </div>
  );
};

export default LoginFooter;
