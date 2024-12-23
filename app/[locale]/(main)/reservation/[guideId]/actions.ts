"use server";

import { client } from "@/lib/apolloClient";
import { CREATE_RESERVATION } from "./queries";
import { reservationSchema } from "./schema";
import { getTranslations } from "next-intl/server";

export async function reserveGuide(
  formData: FormData,
  guideId: number,
  startTime: string,
  endTime: string
) {
  const t = await getTranslations();
  const data = {
    payload: formData.get("payload"),
    customerAgeRange: formData.get("customerAgeRange"),
  };
  const result = reservationSchema(t).safeParse(data);

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
      },
    });

    return createReservation;
  }
}
