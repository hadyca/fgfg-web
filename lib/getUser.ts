import { gql } from "@apollo/client";
import getSession from "./session";
import { client } from "./apolloClient";
import { redirect } from "next/navigation";

export const ME_QUERY = gql`
  query me {
    me {
      id
      username
      email
    }
  }
`;

export default async function getUser() {
  const session = await getSession();
  if (!session.token) {
    return;
  }
  const { data } = await client.query({
    query: ME_QUERY,
    fetchPolicy: "no-cache",
  });
  if (data?.me === null) {
    session.destroy();
    redirect("/");
  }
  return { data };
}
