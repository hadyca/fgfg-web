"use server";

import { client } from "@/lib/apolloClient";
import {
  CREATE_MESSAGE,
  DELETE_CHAT_ROOM,
  READ_ALL_MESSAGES,
  READ_ONE_MESSAGE,
  SEE_CHAT_ROOM,
  SEE_CHAT_ROOM_RESERVATIONS,
  SEE_CHAT_ROOMS,
  SEE_MESSAGES,
} from "./queries";
import { redirect } from "@/i18n/routing";
import { getLocale } from "next-intl/server";

export async function getChatRoom(chatRoomId: String) {
  const locale = await getLocale();
  const {
    data: { seeChatRoom },
  } = await client.query({
    query: SEE_CHAT_ROOM,
    variables: {
      chatRoomId,
    },
    fetchPolicy: "no-cache",
  });

  if (!seeChatRoom) {
    redirect({ href: "/", locale });
  }
  return seeChatRoom;
}

export async function getMessages(chatRoomId: String) {
  const {
    data: { seeMessages },
  } = await client.query({
    query: SEE_MESSAGES,
    variables: {
      chatRoomId,
    },
    fetchPolicy: "no-cache",
  });

  return seeMessages;
}

export async function getChatRooms() {
  const {
    data: { seeChatRooms },
  } = await client.query({
    query: SEE_CHAT_ROOMS,
    fetchPolicy: "no-cache",
  });
  return seeChatRooms;
}

export async function saveMessage(chatRoomId: string, payload: string) {
  const {
    data: {
      createMessage: { ok, error, messageId },
    },
  } = await client.mutate({
    mutation: CREATE_MESSAGE,
    variables: {
      chatRoomId,
      payload,
    },
  });
  return { ok, error, messageId };
}

export async function readAllMessages(chatRoomId: string) {
  await client.mutate({
    mutation: READ_ALL_MESSAGES,
    variables: {
      chatRoomId,
    },
  });
  return;
}

export async function readOneMessage(chatRoomId: string, messageId: number) {
  await client.mutate({
    mutation: READ_ONE_MESSAGE,
    variables: {
      chatRoomId,
      messageId,
    },
  });
  return;
}

export async function outChatRoom(chatRoomId: string) {
  await client.mutate({
    mutation: DELETE_CHAT_ROOM,
    variables: {
      chatRoomId,
    },
  });
  return;
}

export async function getBills(chatRoomId: string) {
  const {
    data: { seeChatRoomReservations },
  } = await client.query({
    query: SEE_CHAT_ROOM_RESERVATIONS,
    variables: {
      chatRoomId,
    },
    fetchPolicy: "no-cache",
  });
  return seeChatRoomReservations;
}
