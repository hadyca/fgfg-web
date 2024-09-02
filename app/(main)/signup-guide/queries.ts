import { gql } from "@apollo/client";

export const CREATE_GUIDE = gql`
  mutation createGuide(
    $fullname: String!
    $birthdate: String!
    $height: String!
    $address: String!
    $phone: String!
    $selfIntro: String!
    $photo: String!
    $language: [LanguageInput!]
  ) {
    createGuide(
      fullname: $fullname
      birthdate: $birthdate
      height: $height
      address: $address
      phone: $phone
      selfIntro: $selfIntro
      photo: $photo
      language: $language
    ) {
      ok
    }
  }
`;
