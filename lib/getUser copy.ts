"use server";
import getSession from "./session";
import { client } from "./apolloClient";
import { ME_QUERY } from "./queries";

let sessionLock = false;

export default async function getUser() {
  // 세션이 잠겨있으면 기다림
  while (sessionLock) {
    await new Promise((resolve) => setTimeout(resolve, 50));
  }

  sessionLock = true; // 세션 잠금 시작

  const session = await getSession();
  if (!session.token) {
    sessionLock = false;
    return;
  }
  const {
    data: { me },
  } = await client.query({
    query: ME_QUERY,
    fetchPolicy: "no-cache",
  });
  sessionLock = false; // 세션 잠금 해제

  return { me };
}
