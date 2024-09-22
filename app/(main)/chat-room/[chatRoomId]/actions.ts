"use server";

import { client } from "@/lib/apolloClient";
import { CREATE_MESSAGE, SEE_CHAT_ROOM, SEE_MESSAGES } from "./queries";

export async function getChatRoom(chatRoomId: String) {
  const { data } = await client.query({
    query: SEE_CHAT_ROOM,
    variables: {
      chatRoomId,
    },
  });
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

export async function saveMessage(chatRoomId: string, payload: string) {
  await client.mutate({
    mutation: CREATE_MESSAGE,
    variables: {
      chatRoomId,
      payload,
    },
  });
}
