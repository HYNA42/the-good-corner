import { gql } from "@apollo/client";

// define mutation => create new ad
export const CREATE_NEW_AD = gql`
  mutation createNewAdd($data: AdInput!) {
    createNewAd(data: $data) {
      id
    }
  }
`;

export const DELETE_AD_BY_ID = gql`
  mutation DeleteAdById($deleteAdId: Float!) {
    deleteAd(id: $deleteAdId)
  }
`;

export const UPDATE_AD = gql`
  mutation UpdateAd($data: UpdateAdInput!) {
    updateAd(data: $data) {
      id
      title
      description
      user {
        id
        email
      }
      price
      location
      createdAt
      category {
        id
        title
      }
      pictures {
        url
      }
      tags {
        id
        name
      }
    }
  }
`;

//register user
export const REGISTER = gql`
  mutation Register($data: UserInput!) {
    register(data: $data)
  }
`;

//login user with generate jwt token
export const LOGIN = gql`
  mutation Login($data: UserInput!) {
    login(data: $data)
  }
`;

//loggout

export const LOGOUT = gql`
  mutation Logout {
    logout
  }
`;
