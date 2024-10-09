"use server";

import { client } from "@/lib/apolloClient";
import { EDIT_USER_PROFILE } from "./queries";
import { redirect } from "next/navigation";

export async function updateAvatar(formData: FormData) {
  const data = {
    avatar: formData.get("avatar"),
  };

  const {
    data: {
      editUserProfile: { ok },
    },
  } = await client.mutate({
    mutation: EDIT_USER_PROFILE,
    variables: {
      avatar: data.avatar,
    },
  });
  if (!ok) {
    redirect("/404");
  }
  return;
}
