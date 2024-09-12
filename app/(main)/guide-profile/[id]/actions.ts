"use server";
import { client } from "@/lib/apolloClient";
import { SEE_GUIDE } from "./queries";

export async function getGuide(guideId: number) {
  const { data } = await client.query({
    query: SEE_GUIDE,
    variables: {
      guideId,
    },
  });
  return data;
}

export async function getGuideReservations();
