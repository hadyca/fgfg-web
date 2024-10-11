import { gql } from "@apollo/client";

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

export const CHECK_PASSWORD = gql`
  query checkPassword($password: String!) {
    checkPassword(password: $password) {
      ok
      error
    }
  }
`;

export const DELETE_ACCOUNT = gql`
  mutation deleteAccount {
    deleteAccount {
      ok
    }
  }
`;
