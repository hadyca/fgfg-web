import { gql } from "@apollo/client";

export const CREATE_GUIDE_PROFILE = gql`
  mutation createGuideProfile(
    $photos: [PhotosInput!]!
    $personality: String!
    $guideIntro: String!
  ) {
    createGuideProfile(
      photos: $photos
      personality: $personality
      guideIntro: $guideIntro
    ) {
      ok
      error
    }
  }
`;
