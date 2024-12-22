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
  const pathname = request.nextUrl.pathname;

  // 2. 현재 경로 체크
  const isOnlyLogoutPath = onlyLogoutUrls.has(pathname);
  const isOnlyLoginPath = onlyLogInUrls.has(pathname);
  const isOnlyGuidePath = onlyGuideUrls.has(pathname);

  // 3. 세션 및 권한 체크
  const session = await getSession();
  const isLoggedIn = Boolean(session.token);
  const isApprovedGuide = Boolean(session.guideId);

  // 권한 체크 및 리다이렉션 로직
  if (isOnlyLogoutPath && isLoggedIn) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  if (isOnlyLoginPath && !isLoggedIn) {
    return NextResponse.redirect(new URL("/create-account", request.url));
  }

  if (isOnlyGuidePath && !isApprovedGuide) {
    const user = await getUser();
    if (user?.me?.guide?.isApproved) {
      const originalUrl = pathname;
      const redirectUrl = new URL("/add-guideid-session", request.url);
      redirectUrl.searchParams.set("redirect", originalUrl);
      return NextResponse.redirect(redirectUrl);
    }
    return NextResponse.redirect(new URL("/", request.url));
  }

  // 마지막으로 next-intl 미들웨어 실행
  return intlMiddleware(request);
}

export const config = {
  matcher: [
    "/",
    "/(en|vn|ko)/:path*",
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
