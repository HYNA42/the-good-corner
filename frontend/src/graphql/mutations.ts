import { gql } from "@apollo/client";

// define mutation => create new ad
export const CREATE_NEW_AD = gql`
  mutation createNewAdd($data: AdInput!) {
    createNewAd(data: $data) {
      id
    }
  }
`;
