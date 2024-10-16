import { gql } from "@apollo/client";

export const EDIT_GUIDE_PROFILE = gql`
  mutation editGuideProfile(
    $fullname: String
    $birthdate: String
    $height: String
    $address: String
    $phone: String
    $language: [LanguageInput!]
    $guidePhotos: [GuidePhotosInput]
    $personality: String
    $guideIntro: String
    $pickupPlaceMain: String
    $pickupPlaceLat: Float
    $pickupPlaceLng: Float
    $pickupPlaceDetail: String
    $isActive: Boolean
    $bankname: String
    $bankAccount: String
  ) {
    editGuideProfile(
      fullname: $fullname
      birthdate: $birthdate
      height: $height
      address: $address
      phone: $phone
      language: $language
      guidePhotos: $guidePhotos
      personality: $personality
      guideIntro: $guideIntro
      pickupPlaceMain: $pickupPlaceMain
      pickupPlaceLat: $pickupPlaceLat
      pickupPlaceLng: $pickupPlaceLng
      pickupPlaceDetail: $pickupPlaceDetail
      isActive: $isActive
      bankname: $bankname
      bankAccount: $bankAccount
    ) {
      ok
      error
    }
  }
`;
