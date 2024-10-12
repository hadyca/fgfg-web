"use server";
import getSession from "./session";
import { client } from "./apolloClient";
import { SEE_MY_GUIDE } from "./queries";

export default async function getGuide() {
  const session = await getSession();
  if (!session.token) {
    return;
  }

  const {
    data: { seeMyGuide },
  } = await client.query({
    query: SEE_MY_GUIDE,
    fetchPolicy: "no-cache",
  });
  return { seeMyGuide };
}
