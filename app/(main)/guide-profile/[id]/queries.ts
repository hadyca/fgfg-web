import { gql } from "@apollo/client";

export const SEE_GUIDE = gql`
  query seeGuide($guideId: Int!) {
    seeGuide(guideId: $guideId) {
      id
      fullname
      birthdate
      personality
      guideIntro
      language
      mainGuidePhoto {
        id
        fileUrl
      }
      guidePhotos {
        id
        fileUrl
      }
      isActive
    }
  }
`;
