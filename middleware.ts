import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import getSession from "./lib/session";

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  console.log("Hello!");
}

export const config = {
  matcher: ["/", "/profile", "/create-account", "/user:path*"],
  
};
