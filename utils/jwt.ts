
import jwt from "jsonwebtoken";

const verifiedToken = (token: string, secret: string) => {
  try {
    const verifiedToken = jwt.verify(token, secret);

    return {
      success: true,
      data: verifiedToken,
    };
  } catch (error: unknown) {
    console.log("Token Verification Failed", error);

    return {
      success: false,
      error: error instanceof Error ? error.message : "Token verification failed",
    };
  }
};

export const jwtUtils = {
  verifiedToken,
};

