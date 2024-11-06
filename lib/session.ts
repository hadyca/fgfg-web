import { getIronSession } from "iron-session";
import { cookies } from "next/headers";

interface SessionContent {
  token?: string;
  guideId?: number;
}

export default async function getSession() {
  return getIronSession<SessionContent>(cookies(), {
    cookieName: "fgfg-cookie",
    password: process.env.COOKIE_PASSWORD!,
  });
}
