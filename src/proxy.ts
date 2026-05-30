import { NextResponse, type NextRequest } from "next/server";
import { randomUUID } from "crypto";
import { SPX_GUEST_COOKIE_NAME } from "./lib/services/client/guest";

export default function proxy(request: NextRequest) {
  const response = NextResponse.next()

  // Will specialize to loyalty page if matcher generalizes to all path
  setGuestCookie(request, response)

  return response;
}

export const config = {
  matcher: "/loyalty/:id/:path*",
};

const setGuestCookie = (request: NextRequest, response: NextResponse) => {
  const guestCookie = request.cookies.get(SPX_GUEST_COOKIE_NAME)
  if (!guestCookie) {
    const guestId = randomUUID();
    const data = JSON.stringify({
      id: guestId,
      dateCreated: new Date(),
    })
    console.debug(`Registering guest account ${guestId}`)

    response.cookies.set({
      name: SPX_GUEST_COOKIE_NAME,
      value: data,
      httpOnly: true,
      // domain (from env)
      secure: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 365, // 1 year
    });
  }
}
