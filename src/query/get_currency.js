import { gql } from "apollo-boost";

export default gql`
  query GetProducts {
    __type(name: "Currency") {
      name
      enumValues {
        name
      }
    }
  }
`;
