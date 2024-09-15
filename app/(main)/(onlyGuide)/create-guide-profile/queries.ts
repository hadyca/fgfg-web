import { gql } from "@apollo/client";

export const CREATE_GUIDE_PROFILE = gql`
  mutation createGuideProfile(
    $guidePhotos: [GuidePhotosInput!]!
    $personality: String!
    $guideIntro: String!
  ) {
    createGuideProfile(
      guidePhotos: $guidePhotos
      personality: $personality
      guideIntro: $guideIntro
    ) {
      ok
      error
    }
  }
`;
