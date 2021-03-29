import { gql } from "apollo-boost";

export default gql`
  query GetCurrency{
    __type(name: "Currency") {
      name
      enumValues {
        name
      }
    }
  }
`;
