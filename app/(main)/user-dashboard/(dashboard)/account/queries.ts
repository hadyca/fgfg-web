import { gql } from "@apollo/client";

export const CHECK_USERNAME = gql`
  query checkUsername($username: String!) {
    checkUsername(username: $username) {
      ok
      error
    }
  }
`;

export const CHECK_EMAIL = gql`
  query checkEmail($email: String!) {
    checkEmail(email: $email) {
      ok
      error
    }
  }
`;

export const EDIT_USER_PROFILE = gql`
  mutation editUserProfile(
    $username: String
    $email: String
    $avatar: String
    $password: String
  ) {
    editUserProfile(
      username: $username
      email: $email
      avatar: $avatar
      password: $password
    ) {
      ok
      error
    }
  }
`;
