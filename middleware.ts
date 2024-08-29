import { NextRequest, NextResponse } from "next/server";
import getSession from "./lib/session";
import { client } from "./lib/apolloClient";
import getUser, { ME_QUERY } from "./lib/getUser";

interface Routes {
  [key: string]: boolean;
}

//로그아웃 상태에서만 접근 가능 한곳
const onlyLogoutUrls = new Set(["/login", "/create-account"]);

//로그인 상태 - 가이드&일반 모두 접속 가능함
const onlyLogInUrls = new Set(["/user-profile", "/signup-guide"]);

//로그인 상태 - 가이드만 접속 가능
const onlyGuideUrls = new Set(["/create-guide-profile"]);

export async function middleware(request: NextRequest) {
  const isOnlyLogoutPath = onlyLogoutUrls.has(request.nextUrl.pathname);
  const isOnlyLoginPath = onlyLogInUrls.has(request.nextUrl.pathname);
  const isOnlyGuidePath = onlyGuideUrls.has(request.nextUrl.pathname);

  const session = await getSession();
  console.log(session);
  const isLoggedIn = Boolean(session.token);
  const isApprovedGuide = Boolean(session.guideId);

  if (isLoggedIn && isOnlyLogoutPath) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  if (!isLoggedIn && isOnlyLoginPath) {
    return NextResponse.redirect(new URL("/create-account", request.url));
  }

  if (!isApprovedGuide && isOnlyGuidePath) {
    const user = await getUser();
    if (user?.me?.guide?.isApproved) {
      // API 호출로 세션을 업데이트
      await fetch(new URL("/api/update-session", request.url), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "same-origin", // 쿠키를 전달하도록 설정
        body: JSON.stringify({ guideId: user.me.guide.id }),
      });
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL("/", request.url));
  }
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
