import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// define routes to access without AUTH
const isPublicRoute = createRouteMatcher([
  "/",
  "/api/webhooks/clerk(.*)",
  "/signin(.*)",
  "/signup(.*)",
  "/suggestion(.*)",
  "/about-us",
  "/blog(.*)",
  "/studio(.*)",
  "/unsubscribe",
  "/sitemap(.*)", // sitemap.xml, sitemap, sitemap.xml.gz
  "/robots.txt",
  "/community(.*)",
]);


const isProtectedRoute = createRouteMatcher([
  '/dashboard(.*)',
  '/settings(.*)',
  '/reviews/new(.*)',
  '/account(.*)'
])

export default clerkMiddleware(async (auth, req) => {
  const { userId, redirectToSignIn, sessionClaims } = await auth();
  const url = new URL(req.url);

  if(isPublicRoute(req)){
    return NextResponse.next()
  }

  if(!userId){
    return redirectToSignIn()
  }

  const claimsLoaded = sessionClaims !== null && sessionClaims !== undefined
  const isOnboarded = !!sessionClaims?.isOnboarded

  if(claimsLoaded && !isOnboarded && url.pathname !== "/onboarding"){
    return NextResponse.redirect(new URL("/onboarding", req.url))
  }

  if(isOnboarded && url.pathname === '/onboarding'){
    return NextResponse.redirect(new URL("/dashboard", req.url))
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
