import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const CALCULATOR_PATH = "/ui/calc";

/**
 * The deployed tester build exposes only the calculator. Development-only
 * playground, data-inspection, and unfinished account routes stay available
 * locally, but are not reachable from a production deployment.
 */
export function proxy(request: NextRequest) {
  if (process.env.NODE_ENV !== "production") {
    return NextResponse.next();
  }

  const { pathname } = request.nextUrl;

  if (pathname === "/") {
    return NextResponse.redirect(new URL(CALCULATOR_PATH, request.url));
  }

  if (pathname === "/bearing-types" || (pathname.startsWith("/ui/") && !pathname.startsWith(CALCULATOR_PATH))) {
    return new NextResponse(null, { status: 404 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/bearing-types/:path*", "/ui/:path*"],
};
