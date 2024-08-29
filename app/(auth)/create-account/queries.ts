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

export const CREATE_ACCOUNT = gql`
  mutation createAccount(
    $username: String!
    $email: String!
    $password: String!
  ) {
    createAccount(username: $username, email: $email, password: $password) {
      ok
      error
      token
    }
  }
`;
