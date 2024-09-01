import { gql } from "@apollo/client";
import getSession from "./session";
import { redirect } from "next/navigation";
import { client } from "./apolloClient";

export const ME_QUERY = gql`
  query me {
    me {
      id
      username
      avatar
      email
      guide {
        id
        fullname
        isApproved
      }
    }
  }
`;

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
  if (me === null) {
    session.destroy();
    redirect("/");
  }
  return { me };
}
