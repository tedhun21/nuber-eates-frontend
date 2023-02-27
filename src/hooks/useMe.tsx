import { useQuery } from "@apollo/client";
import { graphql } from "../gql";

const ME_QUERY = graphql(`
  query Me {
    me {
      id
      email
      role
      verified
    }
  }
`);

export function useMe() {
  return useQuery(ME_QUERY);
}
