"use server";

import { client } from "@/lib/apolloClient";
import {
  CREATE_MESSAGE,
  DELETE_CHAT_ROOM,
  SEE_CHAT_ROOM,
  SEE_CHAT_ROOM_RESERVATIONS,
  SEE_CHAT_ROOMS,
  SEE_MESSAGES,
  UPDATE_ISREAD,
} from "./queries";
import { redirect } from "next/navigation";

export async function getChatRoom(chatRoomId: String) {
  const { data } = await client.query({
    query: SEE_CHAT_ROOM,
    variables: {
      chatRoomId,
    },
    fetchPolicy: "no-cache",
  });
  if (!data.seeChatRoom) {
    redirect("/");
  }
  return data;
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
  const { data } = await client.query({
    query: SEE_CHAT_ROOMS,
    fetchPolicy: "no-cache",
  });
  return data;
}

export async function saveMessage(chatRoomId: string, payload: string) {
  const {
    data: {
      createMessage: { ok },
    },
  } = await client.mutate({
    mutation: CREATE_MESSAGE,
    variables: {
      chatRoomId,
      payload,
    },
  });
  return ok;
}

export async function updateIsRead(chatRoomId: string) {
  await client.mutate({
    mutation: UPDATE_ISREAD,
    variables: {
      chatRoomId,
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
