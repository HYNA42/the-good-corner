import { gql } from "@apollo/client";

export const GET_ALL_ADS = gql`
  query GetAllAds($title: String, $category: String) {
    getAllAds(title: $title, category: $category) {
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
        id
        url
      }
      tags {
        id
        name
      }
    }
  }
`;

export const GET_AD_BY_ID = gql`
  query GetAdById($getAdByIdId: Float!) {
    getAdById(id: $getAdByIdId) {
      id
      title
      description
      user {
        id
        email
      }
      price
      pictures {
        id
        url
      }
      location
      createdAt
      category {
        id
        title
      }
      tags {
        id
        name
      }
    }
  }
`;

//define query => to fetch tag & category
export const GET_ALL_CATEGORY_AND_TAG = gql`
  query GetAllTagAndCategory {
    getAllTag {
      id
      name
    }
    getAllCategory {
      id
      title
    }
  }
`;

//login user with generate jwt token
export const LOGIN = gql`
  query Login($data: UserInput!) {
    login(data: $data)
  }
`;
