import { getIronSession } from "iron-session";
import { cookies } from "next/headers";

interface SessionContent {
  id?: number;
  token?: string;
  isGuide?: Boolean;
}

export default function getSession() {
  return getIronSession<SessionContent>(cookies(), {
    cookieName: "fgfg-cookie",
    password: process.env.COOKIE_PASSWORD!,
  });
}
