import { gql } from "@apollo/client";

export const CREATE_RESERVATION = gql`
  mutation createReservation(
    $guideId: Int!
    $startTime: DateTime!
    $endTime: DateTime!
  ) {
    createReservation(
      guideId: $guideId
      startTime: $startTime
      endTime: $endTime
    ) {
      ok
    }
  }
`;
