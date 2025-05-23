import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// define routes to access without AUTH
const isPublicRoute = createRouteMatcher([
  "/",
  "/signin(.*)",
  "/signup(.*)",
  "/suggestion(.*)",
  "/about-us",
  "/blog(.*)",
  "/studio(.*)",
  "/unsubscribe",
  "/sitemap(.*)", // sitemap.xml, sitemap, sitemap.xml.gz
  "/robots.txt",
]);

export default clerkMiddleware(async (auth, req) => {
  if (!isPublicRoute(req)) await auth.protect();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
    // skip marketing & feedback pages
  ],
};
