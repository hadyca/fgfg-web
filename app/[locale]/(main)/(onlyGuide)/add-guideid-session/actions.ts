"use server";

import getUser from "@/lib/getUser";
import getSession from "@/lib/session";
import { redirect } from "next/navigation";

export default async function saveGuideIdSession(redirectUrl: string) {
  const user = await getUser();
  if (!user?.me?.guide.isApproved) {
    redirect("/");
  }
  const session = await getSession();
  session.guideId = user?.me?.guide?.id;
  await session.save();
  redirect(redirectUrl);
}
