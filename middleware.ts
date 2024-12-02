import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

// Edge Middleware runs on the Edge runtime, a runtime built on top of the V8 JavaScript engine.
export const config = {
  matcher: "/agent",
};

export default async function middleware(request: NextRequest) {
  // Extract country. Default to US if not found.
  const cookieStore = await cookies();
  const token = await cookieStore.get("token");
  console.log("token", token);
  // Specify the correct route based on the requests location
  if (token?.value) {
    return;
  } else {
    request.nextUrl.pathname = "/login";
  }

  // Rewrite to URL
  return NextResponse.redirect(request.nextUrl);
}
