import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const checkoutProtected = request.nextUrl.pathname.startsWith("/checkout");
  const adminProtected = request.nextUrl.pathname.startsWith("/admin");

  console.log(`middleware`);

  const userCookie = request.cookies.get("user")?.value;
  const user = userCookie ? JSON.parse(userCookie) : null;

  if (checkoutProtected && !user) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Redirect if accessing /admin but not an admin
  if (adminProtected && user?.role !== "admin") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

// Apply middleware only on these routes
export const config = {
  matcher: ["/admin", "/checkout/:path*"],
};
