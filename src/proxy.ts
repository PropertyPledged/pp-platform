import { type NextRequest } from "next/server";
import { auth } from "@/server/auth";

const publicRoutes = [
  "/",
  "/signin",
  "/signup",
  "/suggestion",
  "/about-us",
  "/blog",
  "/studio",
  "/unsubscribe",
  "/sitemap",
  "/robots.txt",
  "/community",
];

function isPublicRoute(pathname: string): boolean {
  return publicRoutes.some((route) => {
    if (route.endsWith("*")) {
      return pathname.startsWith(route.slice(0, -1));
    }
    return pathname === route || pathname.startsWith(route + "/");
  });
}

export async function proxy(request: NextRequest) {
  const pathname = new URL(request.url).pathname;

  if (isPublicRoute(pathname) || pathname.startsWith("/api")) {
    return null;
  }

  const session = await auth.api.getSession({
    headers: request.headers,
  });

  if (!session) {
    const url = new URL("/signin", request.url);
    return Response.redirect(url);
  }

  return null;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
