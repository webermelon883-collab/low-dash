import { withAuth } from "next-auth/middleware";
import { NextRequest } from "next/server";

export const middleware = withAuth(
  function middleware(req: NextRequest & { nextauth: any }) {
    // Settings page - only admin can access
    if (req.nextUrl.pathname === "/settings") {
      const token = req.nextauth.token;
      if (!token || token.role !== "admin") {
        return new Response("Access denied", { status: 403 });
      }
    }

    // Protected pages - must be logged in
    if (
      req.nextUrl.pathname === "/overview" ||
      req.nextUrl.pathname === "/products"
    ) {
      const token = req.nextauth.token;
      if (!token) {
        return new Response("Unauthorized", { status: 401 });
      }
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        // Allow access to login page without token
        return !!token;
      },
    },
  },
);

export const config = {
  matcher: ["/settings", "/overview", "/products"],
};
