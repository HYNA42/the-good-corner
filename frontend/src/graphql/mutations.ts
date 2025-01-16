import { gql } from "@apollo/client";

//create new category
export const CREATE_NEW_CATEGORY = gql`
  mutation createNewCategory($data: CategoryInput!) {
    createNewCategory(data: $data) {
      id
      title
    }
  }
`;

//create new Tag
export const CREATE_NEW_TAG = gql`
  mutation CreateNewTag($data: TagInput!) {
    createNewTag(data: $data) {
      id
      name
    }
  }
`;

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

export const CONFIRM_EMAIL = gql`
  mutation ConfirmEmail($code: String!) {
    confirmEmail(code: $code)
  }
`;
