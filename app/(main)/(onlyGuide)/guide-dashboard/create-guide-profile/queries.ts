import { gql } from "@apollo/client";

export const CREATE_GUIDE_PROFILE = gql`
  mutation createGuideProfile(
    $guidePhotos: [GuidePhotosInput!]!
    $personality: String!
    $guideIntro: String!
    $pickupPlaceMain: String!
    $pickupPlaceLat: Float!
    $pickupPlaceLng: Float!
    $pickupPlaceDetail: String!
  ) {
    createGuideProfile(
      guidePhotos: $guidePhotos
      personality: $personality
      guideIntro: $guideIntro
      pickupPlaceMain: $pickupPlaceMain
      pickupPlaceLat: $pickupPlaceLat
      pickupPlaceLng: $pickupPlaceLng
      pickupPlaceDetail: $pickupPlaceDetail
    ) {
      ok
      error
    }
  }
`;
