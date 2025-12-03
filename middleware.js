import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

const PUBLIC_PATHS = ["/login", "/signup"];

async function verifyToken(token) {
  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    await jwtVerify(token, secret);
    return true;
  } catch (e) {
    return false;
  }
}

export async function middleware(req) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get("token")?.value || null;

  const isPublic = PUBLIC_PATHS.includes(pathname);
  const isAuth = token && (await verifyToken(token));

  if (!isPublic && !isAuth) {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  if (isAuth && isPublic) {
    const url = req.nextUrl.clone();
    url.pathname = "/home";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next|static|api|favicon.ico|uploads|avatars|.*\\.png$|.*\\.jpg$|.*\\.jpeg$.*\\.svg$).*)",
  ],
};
