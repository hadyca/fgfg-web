import { NextRequest, NextResponse } from "next/server";
import getSession from "./lib/session";

interface Routes {
  [key: string]: boolean;
}

const publicOnlyUrls: Routes = {
  "/": true,
  "/login": true,
  "/create-account": true,
};

const privateOnlyUrls: Routes = {
  "/profile": true,
};

//로그인 안되었는데, 프라이빗 주소로 접근하면 "/"로 보내버리기
export async function middleware(request: NextRequest) {
  const session = await getSession();
  const exists = publicOnlyUrls[request.nextUrl.pathname];
  const isPrivate = privateOnlyUrls[request.nextUrl.pathname];

  if (!session.token && isPrivate) {
    return NextResponse.redirect(new URL("/create-account", request.url));
  }
  // if (!session.token) {
  //   return NextResponse.redirect(new URL("/", request.url));
  // } else {
  //   return NextResponse.redirect(new URL("/profile", request.url));
  // }
  // if (!session.token) {
  //   if (!exists) {
  //     return NextResponse.redirect(new URL("/login", request.url));
  //   }
  // } else {
  //   if (exists) {
  //     return NextResponse.redirect(new URL("/", request.url));
  //   }
  // }
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
