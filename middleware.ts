import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Garante que /admin/login e /login sejam sempre acessíveis (não redirecionados).
 * A proteção do dashboard (/admin) é feita no layout (protected).
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/admin/login" || pathname === "/login") {
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/login"],
};
