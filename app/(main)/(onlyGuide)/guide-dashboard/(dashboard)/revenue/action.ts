import { client } from "@/lib/apolloClient";
import { SEE_ALL_UNTRANSFERRED_REVENUE } from "./queries";

export async function getUntransferredRevenue() {
  const {
    data: { seeAllunTransferredRevenue },
  } = await client.mutate({
    mutation: SEE_ALL_UNTRANSFERRED_REVENUE,
  });
  return seeAllunTransferredRevenue;
}
