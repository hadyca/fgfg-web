import { client } from "@/lib/apolloClient";
import { SEE_AVAILABLE_GUIDES } from "./queries";

export async function getGuides(startTime?: string, endTime?: string) {
  const { data } = await client.query({
    query: SEE_AVAILABLE_GUIDES,
    variables: {
      startTime,
      endTime,
    },
  });
  return data;
}
