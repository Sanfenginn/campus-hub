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

export const DELETE_USERS = gql`
  mutation DeleteUsers($id: [String!]!) {
    deleteUsers(id: $id) {
      message
      errors
    }
  }
`;

export const USER_DELETED_SUBSCRIPTION = gql`
  subscription OnUserDeleted {
    userDeleted {
      message
      results {
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
  }
`;

export const USER_ADDED_SUBSCRIPTION = gql`
  subscription OnUserCreated {
    userCreated {
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
