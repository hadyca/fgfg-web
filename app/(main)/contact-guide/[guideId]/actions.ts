"use server";

import { client } from "@/lib/apolloClient";
import { contactGuideSchema } from "./schema";
import { CREATE_CHAT_ROOM } from "./queries";
import { notFound } from "next/navigation";

export async function createChatRoom(formData: FormData, guideId: number) {
  const data = {
    payload: formData.get("payload"),
    customerAgeRange: formData.get("customerAgeRange"),
  };
  const result = contactGuideSchema.safeParse(data);
  if (!result.success) {
    return result.error.flatten();
  } else {
    const {
      data: { createChatRoom },
    } = await client.mutate({
      mutation: CREATE_CHAT_ROOM,
      variables: {
        guideId,
        payload: result.data.payload,
      },
    });
    if (!data) {
      return notFound();
    }
    return createChatRoom;
  }
}
