"use server";
import { client } from "@/lib/apolloClient";
import { REPORT_GUIDE, SEE_GUIDE } from "./queries";

export async function getGuide(guideId: number) {
  const { data } = await client.query({
    query: SEE_GUIDE,
    variables: {
      guideId,
    },
    fetchPolicy: "no-cache",
  });

  return data;
}

export async function reportGuide(guideId: number, reason: string) {
  const { data } = await client.mutate({
    mutation: REPORT_GUIDE,
    variables: {
      guideId,
      reason,
    },
  });
  return data;
}
