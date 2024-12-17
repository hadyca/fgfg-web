"use server";

import { client } from "@/lib/apolloClient";
import {
  CONFIRM_RESERVATION,
  GUIDE_CANCEL_RESERVATION,
  SEE_GUIDE_ALL_RESERVATIONS,
} from "./queries";
import { notFound } from "next/navigation";

export async function getReservations() {
  const {
    data: { seeGuideAllReservations },
  } = await client.query({
    query: SEE_GUIDE_ALL_RESERVATIONS,
    fetchPolicy: "no-cache",
  });
  if (!seeGuideAllReservations) {
    return notFound();
  }
  return seeGuideAllReservations;
}

export async function cancelReservation(reservationId: number) {
  const {
    data: {
      guideCancelReservation: { ok, error },
    },
  } = await client.mutate({
    mutation: GUIDE_CANCEL_RESERVATION,
    variables: { reservationId },
  });
  return { ok, error };
}

export async function confirmReservation(reservationId: number) {
  const {
    data: {
      confirmReservation: { ok, error },
    },
  } = await client.mutate({
    mutation: CONFIRM_RESERVATION,
    variables: { reservationId },
  });
  return { ok, error };
}
