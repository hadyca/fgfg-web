"use server";

import getUser from "@/lib/getUser";
import getSession from "@/lib/session";
import { redirect } from "@/i18n/routing";
import { getLocale } from "next-intl/server";

export default async function saveGuideIdSession(redirectUrl: string) {
  const locale = await getLocale();
  const user = await getUser();
  if (!user?.me?.guide.isApproved) {
    redirect({ href: "/", locale });
  }
  const session = await getSession();
  session.guideId = user?.me?.guide?.id;
  await session.save();
  redirect({ href: redirectUrl, locale });
}
