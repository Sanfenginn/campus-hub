import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation Login($input: LoginRequestDto!) {
    login(input: $input) {
      token
      role {
        userType
        userId
      }
    }
  }
`;
