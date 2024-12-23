"use server";

import { redirect } from "@/i18n/routing";
import getSession from "./session";
import { getLocale } from "next-intl/server";

export async function logout() {
  const locale = await getLocale();
  const session = await getSession();
  session.destroy();
  redirect({ href: "/", locale });
}
