"use server";

import { client } from "@/lib/apolloClient";
import { CREATE_RESERVATION } from "./queries";
import { redirect } from "next/navigation";
import { reservationSchema } from "./schema";

export async function reserveGuide(
  formData: FormData,
  guideId: number,
  startTime: string,
  endTime: string,
  paymentIntentId: string
) {
  const data = {
    payload: formData.get("payload"),
    customerAgeRange: formData.get("customerAgeRange"),
  };
  const result = reservationSchema.safeParse(data);

  if (!result.success) {
    return result.error.flatten();
  } else {
    const {
      data: { createReservation },
    } = await client.mutate({
      mutation: CREATE_RESERVATION,
      variables: {
        guideId,
        startTime,
        endTime,
        customerAgeRange: result?.data?.customerAgeRange,
        paymentIntentId,
      },
    });

    return createReservation;
  }
}
