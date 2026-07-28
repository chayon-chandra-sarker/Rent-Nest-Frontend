import React from "react";
import RegisterFrom from "../_components/RegisterFrom";
import RegisterFooter from "../_components/RegisterFooter";

const Register = () => {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md space-y-6 rounded-lg border p-8 shadow-lg">
        <div className="text-center space-y-1">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            Welcome RentNest
          </h1>
          <p className="text-sm text-muted-foreground">
            Register in to your RentNest account
          </p>
        </div>

        <div>
          <RegisterFrom></RegisterFrom>
          <RegisterFooter></RegisterFooter>
        </div>
      </div>
    </div>
  );
};

export default Register;
