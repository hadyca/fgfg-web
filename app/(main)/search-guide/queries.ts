import { gql } from "@apollo/client";

export const SEE_AVAILABLE_GUIDES = gql`
  query seeAvailableGuides($startTime: DateTime, $endTime: DateTime) {
    seeAvailableGuides(startTime: $startTime, endTime: $endTime) {
      id
      fullname
      birthdate
      personality
      mainGuidePhoto {
        id
        fileUrl
      }
      isActive
    }
  }
`;
