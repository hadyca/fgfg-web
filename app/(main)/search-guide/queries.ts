import { gql } from "@apollo/client";

export const SEE_AVAILABLE_GUIDES = gql`
  query seeAvailableGuides($startTime: String, $endTime: String) {
    seeAvailableGuides(startTime: $startTime, endTime: $endTime) {
      id
      fullname
    }
  }
`;
