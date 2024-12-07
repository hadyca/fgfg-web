"use server";

import getSession from "./session";
import { client } from "./apolloClient";
import { ME_QUERY } from "./queries";

export default async function getUser() {
  const session = await getSession();
  if (!session.token) {
    return;
  }

  const {
    data: { me },
  } = await client.query({
    query: ME_QUERY,
    fetchPolicy: "no-cache",
  });

  return { me };
}
