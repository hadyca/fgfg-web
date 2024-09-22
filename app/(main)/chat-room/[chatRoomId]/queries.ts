import { gql } from "@apollo/client";

export const SEE_CHAT_ROOM = gql`
  query seeChatRoom($chatRoomId: String!) {
    seeChatRoom(chatRoomId: $chatRoomId) {
      id
    }
  }
`;

export const SEE_MESSAGES = gql`
  query seeMessages($chatRoomId: String!) {
    seeMessages(chatRoomId: $chatRoomId) {
      id
      payload
      user {
        id
        avatar
        username
      }
      createdAt
    }
  }
`;

export const CREATE_MESSAGE = gql`
  mutation createMessage($chatRoomId: String!, $payload: String!) {
    createMessage(chatRoomId: $chatRoomId, payload: $payload) {
      ok
    }
  }
`;
