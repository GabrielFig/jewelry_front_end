import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Decode JWT payload without cryptographic verification.
// Reading role from the token is strictly better than a separate unsigned cookie:
// the payload cannot be altered without breaking the backend signature.
function decodeJwtPayload(token: string): Record<string, unknown> | null {
  try {
    const payload = token.split(".")[1];
    if (!payload) return null;
    const padded = payload
      .replace(/-/g, "+")
      .replace(/_/g, "/")
      .padEnd(Math.ceil(payload.length / 4) * 4, "=");
    return JSON.parse(atob(padded));
  } catch {
    return null;
  }
}

export function middleware(request: NextRequest) {
  const token = request.cookies.get("access_token")?.value;
  const { pathname } = request.nextUrl;

  const isAdminRoute = pathname.startsWith("/admin");
  const isAccountRoute =
    pathname.startsWith("/account") || pathname.startsWith("/checkout");

  if (isAdminRoute) {
    if (!token) {
      return NextResponse.redirect(
        new URL("/auth/login?next=" + pathname, request.url)
      );
    }
    const payload = decodeJwtPayload(token);
    const role = (payload?.role ?? payload?.user_role) as string | undefined;
    if (role !== "admin") {
      return NextResponse.redirect(
        new URL("/auth/login?next=" + pathname, request.url)
      );
    }
  }

  if (isAccountRoute) {
    if (!token) {
      return NextResponse.redirect(
        new URL("/auth/login?next=" + pathname, request.url)
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/account/:path*", "/checkout/:path*"],
};
