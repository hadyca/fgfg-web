import { gql } from "@apollo/client";

export const CREATE_GUIDE_PROFILE = gql`
  mutation createGuideProfile(
    $photos: [PhotosInput!]!
    $personality: String!
    $height: String!
    $guideIntro: String!
  ) {
    createGuideProfile(
      photos: $photos
      personality: $personality
      height: $height
      guideIntro: $guideIntro
    ) {
      ok
    }
  }
`;
