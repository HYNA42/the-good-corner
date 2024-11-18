import { gql } from "@apollo/client";

export const GET_ALL_ADS = gql`
  query GetAllAds {
    getAllAds {
      id
      title
      description
      owner
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
    }
  }
`;

export const GET_AD_BY_ID = gql`
  query GetAdById($getAdByIdId: Float!) {
    getAdById(id: $getAdByIdId) {
      id
      title
      description
      owner
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