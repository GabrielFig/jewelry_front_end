import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("access_token")?.value;
  const role = request.cookies.get("user_role")?.value;
  const { pathname } = request.nextUrl;

  const isAdminRoute = pathname.startsWith("/admin");
  const isAccountRoute = pathname.startsWith("/account") || pathname.startsWith("/checkout");

  if (isAdminRoute) {
    if (!token || role !== "admin") {
      return NextResponse.redirect(new URL("/auth/login?next=" + pathname, request.url));
    }
  }

  if (isAccountRoute) {
    if (!token) {
      return NextResponse.redirect(new URL("/auth/login?next=" + pathname, request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/account/:path*", "/checkout/:path*"],
};
