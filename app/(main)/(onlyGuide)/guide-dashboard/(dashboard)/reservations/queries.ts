import { gql } from "@apollo/client";

export const SEE_GUIDE_ALL_RESERVATIONS = gql`
  query seeGuideAllReservations {
    seeGuideAllReservations {
      id
      user {
        avatar
        username
      }
      startTime
      endTime
      guideConfirm
      userCancel
      guideCancel
      serviceFee
      customerAgeRange
      pickupPlaceMain
      pickupPlaceDetail
      createdAt
    }
  }
`;

export const GUIDE_CANCEL_RESERVATION = gql`
  mutation guideCancelReservation($reservationId: Int!) {
    guideCancelReservation(reservationId: $reservationId) {
      ok
      error
    }
  }
`;

export const CONFIRM_RESERVATION = gql`
  mutation confirmReservation($reservationId: Int!) {
    confirmReservation(reservationId: $reservationId) {
      ok
      error
    }
  }
`;
