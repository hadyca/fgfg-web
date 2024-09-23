import { gql } from "@apollo/client";
import getSession from "./session";
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
      chatRooms {
        id
        users {
          username
        }
        messages {
          payload
        }
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
  return { me };
}
