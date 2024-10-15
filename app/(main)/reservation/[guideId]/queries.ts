import { gql } from "@apollo/client";

export const CREATE_RESERVATION = gql`
  mutation createReservation(
    $guideId: Int!
    $startTime: DateTime!
    $endTime: DateTime!
    $customerAgeRange: String!
    $paymentIntentId: String!
  ) {
    createReservation(
      guideId: $guideId
      startTime: $startTime
      endTime: $endTime
      customerAgeRange: $customerAgeRange
      paymentIntentId: $paymentIntentId
    ) {
      ok
      error
    }
  }
`;
