import { NextRequest, NextResponse } from "next/server";
import getSession from "./lib/session";
import getUser from "./lib/getUser";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

//로그아웃 상태에서만 접근 가능 한곳
const onlyLogoutUrls = new Set(["/login", "/create-account"]);

//로그인 상태 - 가이드&일반 모두 접속 가능함
const onlyLogInUrls = new Set(["/user-dashboard", "/signup-guide"]);

//로그인 상태 - 가이드만 접속 가능
const onlyGuideUrls = new Set(["/guide-dashboard"]);

const intlMiddleware = createMiddleware(routing);

export async function middleware(request: NextRequest) {
  // 1. next-intl 미들웨어 실행
  const intlResponse = intlMiddleware(request);
  if (intlResponse) {
    return intlResponse;
  }

  // 2. 현재 경로 체크
  const isOnlyLogoutPath = onlyLogoutUrls.has(request.nextUrl.pathname);
  const isOnlyLoginPath = onlyLogInUrls.has(request.nextUrl.pathname);
  const isOnlyGuidePath = onlyGuideUrls.has(request.nextUrl.pathname);

  // 3. 세션 및 권한 체크
  const session = await getSession();
  const isLoggedIn = Boolean(session.token);
  const isApprovedGuide = Boolean(session.guideId);

  if (isOnlyLogoutPath && isLoggedIn) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  if (isOnlyLoginPath && !isLoggedIn) {
    return NextResponse.redirect(new URL("/create-account", request.url));
  }

  if (isOnlyGuidePath && !isApprovedGuide) {
    const user = await getUser();
    if (user?.me?.guide?.isApproved) {
      const originalUrl = request.nextUrl.pathname; // 원래 사용자가 가려던 URL

      const redirectUrl = new URL("/add-guideid-session", request.url);
      redirectUrl.searchParams.set("redirect", originalUrl); // 원래 URL을 쿼리 파라미터로 추가
      return NextResponse.redirect(redirectUrl);
    }
    return NextResponse.redirect(new URL("/", request.url));
  }
}

export const config = {
  matcher: [
    "/",
    "/(en|vn|ko)/:path*",
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
