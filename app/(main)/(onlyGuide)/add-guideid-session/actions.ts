"use server";

import getUser from "@/lib/getUser";
import getSession from "@/lib/session";

export default async function saveGuideIdSession() {
  const user = await getUser();
  const session = await getSession();
  session.guideId = user?.me?.guide?.id;
  await session.save();
}
