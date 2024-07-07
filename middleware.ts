import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  console.log("checking request ----",request);
  // if(!request?.token && !request.url.includes('signin')){
  //   return NextResponse.redirect(new URL("/signin", request.url));
  // }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/blog/:path*",
};
