import { useParams } from "react-router-dom";
import { graphql } from "../gql";
import { useQuery } from "@apollo/client";
import { GetOrderQuery, GetOrderQueryVariables } from "../gql/graphql";

const GET_ORDER_QUERY = graphql(`
  query GetOrder($getOrderInput: GetOrderInput!) {
    getOrder(input: $getOrderInput) {
      ok
      error
      order {
        id
        total
        status
        driver {
          email
        }
        customer {
          email
        }
        restaurant {
          name
        }
      }
    }
  }
`);

interface IParams {
  id: string;
}

export const Order = () => {
  const params = useParams<IParams>();
  const { data } = useQuery<GetOrderQuery, GetOrderQueryVariables>(GET_ORDER_QUERY, {
    variables: {
      getOrderInput: { id: +params.id },
    },
  });
  console.log(data);
  return <div>{params.id}</div>;
};
