import { gql } from "@apollo/client";

export const SEE_CHAT_ROOM = gql`
  query seeChatRoom($chatRoomId: String!) {
    seeChatRoom(chatRoomId: $chatRoomId) {
      id
      normalUserId
      guideUserId
      otherUserId
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
      isMyMessage
      createdAt
    }
  }
`;

export const CREATE_MESSAGE = gql`
  mutation createMessage($chatRoomId: String!, $payload: String!) {
    createMessage(chatRoomId: $chatRoomId, payload: $payload) {
      ok
      error
      messageId
    }
  }
`;

export const SEE_CHAT_ROOMS = gql`
  query seeChatRooms {
    seeChatRooms {
      id
      avatar
      usernameOrFullname
      lastMessage
      createdAt
      isRead
    }
  }
`;

export const READ_ALL_MESSAGES = gql`
  mutation readAllMessages($chatRoomId: String!) {
    readAllMessages(chatRoomId: $chatRoomId) {
      ok
    }
  }
`;

export const READ_ONE_MESSAGE = gql`
  mutation readOneMessage($chatRoomId: String!, $messageId: Int!) {
    readOneMessage(chatRoomId: $chatRoomId, messageId: $messageId) {
      ok
    }
  }
`;

export const DELETE_CHAT_ROOM = gql`
  mutation deleteChatRoom($chatRoomId: String!) {
    deleteChatRoom(chatRoomId: $chatRoomId) {
      ok
    }
  }
`;

export const SEE_CHAT_ROOM_RESERVATIONS = gql`
  query seeChatRoomReservations($chatRoomId: String!) {
    seeChatRoomReservations(chatRoomId: $chatRoomId) {
      id
      startTime
      endTime
      guideConfirm
      userCancel
      guideCancel
      pickupPlaceMain
      pickupPlaceDetail
      isDeposited
    }
  }
`;
