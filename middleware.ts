import { NextRequest, NextResponse } from "next/server";
import getSession from "./lib/session";

interface Routes {
  [key: string]: boolean;
}

//로그아웃 상태에서만 접근 가능 한곳
const onlyLogoutUrls = new Set(["/login", "/create-account"]);

//로그인 상태 - 가이드&일반 유저 공통
const onlyLogInAllUserUrls = new Set(["/profile"]);

//로그인 상태 - 가이드만
const onlyGuideUrls = new Set(["/가이드만가능한곳"]);

//로그인 상태 - 일반 유저만
const onlyNormalUserUrls = new Set(["/signup-guide"]);

export async function middleware(request: NextRequest) {
  const isOnlyLogoutPath = onlyLogoutUrls.has(request.nextUrl.pathname);
  const isOnlyLoginAllUserPath = onlyLogInAllUserUrls.has(
    request.nextUrl.pathname
  );
  const isOnlyGuidePath = onlyGuideUrls.has(request.nextUrl.pathname);
  const isOnlyNormalUserPath = onlyNormalUserUrls.has(request.nextUrl.pathname);

  const session = await getSession();

  const isLoggedIn = Boolean(session.token);
  const isGuide = Boolean(session.isGuide);

  if (isLoggedIn && isOnlyLogoutPath) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  if (!isLoggedIn && isOnlyLoginAllUserPath) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (!isGuide && isOnlyGuidePath) {
    //가이드가 아닌데(로그아웃상태&일반유저), 가이드만 접근 가능한 곳에 들어왔을 때(url추가해야함)
    return NextResponse.redirect(new URL("/", request.url));
  }
  //일반 유저가 갈수 있는 경로를 가이드가 못가는 유일한 1가지 경로
  if (isGuide && isOnlyNormalUserPath) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  if (!isLoggedIn && isOnlyNormalUserPath) {
    return NextResponse.redirect(new URL("/create-account", request.url));
  }
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
