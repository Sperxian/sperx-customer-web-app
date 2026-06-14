import { NextResponse, NextRequest } from "next/server";
import { randomUUID } from "crypto";
import { SPX_GUEST_COOKIE_NAME } from "./lib/services/guest";
import { clerkMiddleware } from "@clerk/nextjs/server";

const proxy = clerkMiddleware((_auth, request: NextRequest) => {
  const { pathname } = request.nextUrl;

  const response = NextResponse.next()

  if (pathname.startsWith('/loyalty')) {
    // or matches with loyalty/id
    setGuestCookie(request, response)
  }

  return response;
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
    // Always run for Clerk-specific frontend API routes
    '/__clerk/(.*)',
  ]
};

const setGuestCookie = (request: NextRequest, response: NextResponse) => {
  const guestCookie = request.cookies.get(SPX_GUEST_COOKIE_NAME)
  if (!guestCookie) {
    const guestId = randomUUID();
    console.debug(`Registering guest account ${guestId}`)

    response.cookies.set({
      name: SPX_GUEST_COOKIE_NAME,
      value: guestId,
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 365, // 1 year
    });
  }
}
// import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

// const isPublicRoute = createRouteMatcher([
//   '/member(.*)',
// ])

// export default clerkMiddleware(async (auth, req) => {
//   if (!isPublicRoute(req)) {
//     await auth.protect();
//   }
// })
export default proxy;
