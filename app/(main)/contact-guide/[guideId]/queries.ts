import { gql } from "@apollo/client";

export const CREATE_CHAT_ROOM = gql`
  mutation createChatRoom($guideId: Int!, $payload: String!) {
    createChatRoom(guideId: $guideId, payload: $payload) {
      id
      otherUserId
    }
  }
`;
