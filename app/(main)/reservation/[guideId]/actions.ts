"use server";

import { client } from "@/lib/apolloClient";
import { CREATE_RESERVATION } from "./queries";
import { redirect } from "next/navigation";

export async function reserveGuide(
  guideId: number,
  startTime: string,
  endTime: string
) {
  const { data } = await client.mutate({
    mutation: CREATE_RESERVATION,
    variables: {
      guideId,
      startTime,
      endTime,
    },
  });

  if (!data) {
    redirect("/404");
  }
  return data;
}
