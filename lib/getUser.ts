import { gql } from "@apollo/client";
import getSession from "./session";
import { client } from "./apolloClient";

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
  });
  if (data?.me === null) {
    //세션 토큰 삭제
    return;
  }
  return { data };
}
