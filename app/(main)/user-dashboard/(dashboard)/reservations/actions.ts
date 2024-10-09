"use server";

import { client } from "@/lib/apolloClient";
import { SEE_USER_ALL_RESERVATIONS, USER_CANCEL_RESERVATION } from "./queries";
import { redirect } from "next/navigation";

export async function getReservations() {
  const {
    data: { seeUserAllReservations },
  } = await client.query({
    query: SEE_USER_ALL_RESERVATIONS,
    fetchPolicy: "no-cache",
  });

  if (!seeUserAllReservations) {
    redirect("/404");
  }
  return seeUserAllReservations;
}

export async function cancelReservation(reservationId: number) {
  const {
    data: {
      userCancelReservation: { ok },
    },
  } = await client.mutate({
    mutation: USER_CANCEL_RESERVATION,
    variables: { reservationId },
  });
  return ok;
}
