import { gql } from "@apollo/client";

export const SEE_MY_GUIDE_PROFILE = gql`
  query seeMyGuideProfile {
    seeMyGuideProfile {
      id
      personality
      guideIntro
      photos {
        id
        fileUrl
      }
    }
  }
`;
export const EDIT_GUIDE_PROFILE = gql`
  mutation editGuideProfile(
    $photos: [PhotosInput!]!
    $personality: String!
    $guideIntro: String!
  ) {
    editGuideProfile(
      photos: $photos
      personality: $personality
      guideIntro: $guideIntro
    ) {
      ok
      error
    }
  }
`;
