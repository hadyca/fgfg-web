import { gql } from "@apollo/client";

export const SEE_USER_ALL_RESERVATIONS = gql`
  query seeUserAllReservations {
    seeUserAllReservations {
      id
      guide {
        id
        mainGuidePhoto {
          fileUrl
        }
        fullname
        birthdate
      }
      startTime
      endTime
      pickupPlaceMain
      pickupPlaceDetail
      guideConfirm
      userCancel
      guideCancel
      serviceFee
      createdAt
    }
  }
`;

export const USER_CANCEL_RESERVATION = gql`
  mutation userCancelReservation($reservationId: Int!) {
    userCancelReservation(reservationId: $reservationId) {
      ok
      error
    }
  }
`;
