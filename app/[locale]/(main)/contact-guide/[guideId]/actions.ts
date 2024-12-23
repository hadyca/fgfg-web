"use server";

import { client } from "@/lib/apolloClient";
import { contactGuideSchema } from "./schema";
import { CREATE_CHAT_ROOM } from "./queries";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";

export async function createChatRoom(formData: FormData, guideId: number) {
  const t = await getTranslations();
  const data = {
    payload: formData.get("payload"),
    customerAgeRange: formData.get("customerAgeRange"),
  };
  const result = contactGuideSchema(t).safeParse(data);
  if (!result.success) {
    return {
      ok: false,
      error: "something went wrong",
    };
  } else {
    const {
      data: {
        createChatRoom: { ok, error, chatRoom, messageId },
      },
    } = await client.mutate({
      mutation: CREATE_CHAT_ROOM,
      variables: {
        guideId,
        payload: result.data.payload,
      },
    });
    if (!data) {
      notFound();
    }
    return { ok, error, chatRoom, messageId };
  }
}
