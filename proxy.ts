import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { JwtPayload } from "jsonwebtoken";
import { jwtUtils } from "./utils/jwt";
import { cookies } from "next/headers";
import { getNewAccessToken } from "./service/refreshToken";

const AUTH_ROUTES = ["/login", "/register"];
const PUBLIC_ROUTES = ["/", "/about", "/contact", "/categories"];

export async function proxy(request: NextRequest) {
  const cookieStore = await cookies();
  const pathname = request.nextUrl.pathname;
  let accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;

  let decodedAccessToken = accessToken
    ? jwtUtils.verifiedToken(
        accessToken,
        process.env.JWT_ACCESS_SECRET as string,
      )
    : null;

  const decodedRefreshToken = refreshToken
    ? jwtUtils.verifiedToken(
        refreshToken,
        process.env.JWT_REFRESH_SECRET as string,
      )
    : null;
    if(!decodedAccessToken?.success && decodedRefreshToken?.success){
      const result = await getNewAccessToken();
      if(result.success){
        const newAccessToken = result.data.accessToken;
        cookieStore.set("accessToken", newAccessToken, {
          httpOnly: true,
          maxAge:60* 60* 24,
          sameSite: "lax"
        });
        accessToken=newAccessToken;

      decodedAccessToken = jwtUtils.verifiedToken(
        accessToken!,process.env.JWT_ACCESS_SECRET as string,
      )
      }
    };

  let userRole = null;

 //cookies expire
  if (!decodedAccessToken?.success) {
    cookieStore.delete("accessToken");
  };


  if (decodedAccessToken?.success && decodedAccessToken.data) {
    userRole = (decodedAccessToken.data as JwtPayload).role;
  };

  if (accessToken && AUTH_ROUTES.includes(pathname)) {

    if (userRole === "TENANT") {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    } else if (userRole === "ADMIN") {
      return NextResponse.redirect(new URL("/admin-dashboard", request.url));
    } else if (userRole === "LANDLORD") {
      return NextResponse.redirect(
        new URL("/land-lord-dashboard", request.url),
      );
    } else {
      return NextResponse.redirect(new URL("/", request.url));
    }
  };

  const isPublicRoute = PUBLIC_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(route + "/"),
  );

  const isAuthRoute = AUTH_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(route + "/"),
  );
  if (!accessToken && !isPublicRoute && !isAuthRoute) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  //protected route
  if (pathname.startsWith("/dashboard") && userRole !== "TENANT") {
    return NextResponse.redirect(new URL("/not-found", request.url));
  } else if (pathname.startsWith("/admin-dashboard") && userRole !== "ADMIN") {
    return NextResponse.redirect(new URL("/not-found", request.url));
  } else if (
    pathname.startsWith("/land-lord-dashboard") &&
    userRole !== "LANDLORD"
  ) {
    return NextResponse.redirect(new URL("/not-found", request.url));
  }

  return NextResponse.next();
}

// Alternatively, you can use a default export:
// export default function proxy(request: NextRequest) { ... }

export const config = {
  matcher: [
    // '/dashboard/:path*',
    // '/admin-dashboard/:path*'
    "/((?!api|_next/static|_next/image|.*\\.png$).*)",
  ],
};
