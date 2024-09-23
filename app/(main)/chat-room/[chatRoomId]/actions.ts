"use server";

import { client } from "@/lib/apolloClient";
import {
  CREATE_MESSAGE,
  SEE_CHAT_ROOM,
  SEE_CHAT_ROOMS,
  SEE_MESSAGES,
  UPDATE_ISREAD,
} from "./queries";
import { notFound } from "next/navigation";

export async function getChatRoom(chatRoomId: String) {
  const { data } = await client.query({
    query: SEE_CHAT_ROOM,
    variables: {
      chatRoomId,
    },
    fetchPolicy: "no-cache",
  });

  if (!data.seeChatRoom) {
    return notFound();
  }
  return;
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
  await client.mutate({
    mutation: CREATE_MESSAGE,
    variables: {
      chatRoomId,
      payload,
    },
  });
  return;
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
