import { gql } from "@apollo/client";

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
          id
          username
        }
        messages {
          payload
        }
      }
    }
  }
`;
