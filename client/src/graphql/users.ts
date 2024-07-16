import { gql } from "@apollo/client";

export const FIND_USERS = gql`
  query FindAllUsers($conditionVar: FindUsersRequestDto!) {
    findAllUsers(condition: $conditionVar) {
      id
      dob
      account
      name {
        firstName
        lastName
      }
      role {
        userType
        userId
      }
      address {
        houseNumber
        street
        suburb
        city
        state
        country
        postalCode
      }
      contact {
        email
        phone
      }
    }
  }
`;
