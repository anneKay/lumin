import { gql } from "apollo-boost";

export default gql`
  query GetProducts($currency: Currency!) {
    products {
      id
      title
      image_url
      price (currency: $currency)
    }
  }
`;
