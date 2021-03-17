import { gql } from "apollo-boost";

export default gql`
  query GetProducts {
    products {
      id
      title
      image_url
      price(currency: USD)
    }
  }
`;
