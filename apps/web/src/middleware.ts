import { authMiddleware } from "@repo/auth/middleware";

export default authMiddleware;

// Read more: https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - auth/* (auth routes)
     */
    "/((?!api|_next/static|_next/image|favicon\\.ico|auth/).*)",
  ],
};
