import { useParams } from "react-router-dom";
import { graphql } from "../gql";
import { useQuery, useSubscription } from "@apollo/client";
import { GetOrderQuery, GetOrderQueryVariables, OrderUpdatesSubscription, OrderUpdatesSubscriptionVariables } from "../gql/graphql";

const GET_ORDER_QUERY = graphql(`
  query GetOrder($getOrderInput: GetOrderInput!) {
    getOrder(input: $getOrderInput) {
      ok
      error
      order {
        ...FullOrderParts
      }
    }
  }
`);

const ORDER_UPDATES_SUBSCRIPTION = graphql(`
  subscription OrderUpdates($orderUpdatesInput: OrderUpdatesInput!) {
    orderUpdates(input: $orderUpdatesInput) {
      ...FullOrderParts
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
  const { data: subscriptionData } = useSubscription<OrderUpdatesSubscription, OrderUpdatesSubscriptionVariables>(ORDER_UPDATES_SUBSCRIPTION, {
    variables: {
      orderUpdatesInput: {
        id: +params.id,
      },
    },
  });
  console.log(subscriptionData);
  return <div>{params.id}</div>;
};
