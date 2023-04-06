import { useParams } from "react-router-dom";
import { graphql } from "../gql";
import { useQuery, useSubscription } from "@apollo/client";
import { GetOrderQuery, GetOrderQueryVariables, OrderUpdatesSubscription, OrderUpdatesSubscriptionVariables } from "../gql/graphql";
import { useEffect } from "react";
import { useMe } from "../hooks/useMe";

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
  const { data: userData } = useMe();
  const { data, subscribeToMore } = useQuery<GetOrderQuery, GetOrderQueryVariables>(GET_ORDER_QUERY, {
    variables: {
      getOrderInput: { id: +params.id },
    },
  });
  useEffect(() => {
    if (data?.getOrder.ok) {
      subscribeToMore({
        document: ORDER_UPDATES_SUBSCRIPTION,
        variables: {
          orderUpdatesInput: {
            id: +params.id,
          },
          updateQuery: (prev: GetOrderQuery, { subscriptionData: { data } }: { subscriptionData: { data: OrderUpdatesSubscription } }) => {
            if (!data) return prev;
            return {
              getOrder: {
                ...prev.getOrder,
                order: {
                  ...data.orderUpdates,
                },
              },
            };
          },
        },
      });
    }
  }, [data]);
  const { data: subscriptionData } = useSubscription<OrderUpdatesSubscription, OrderUpdatesSubscriptionVariables>(ORDER_UPDATES_SUBSCRIPTION, {
    variables: {
      orderUpdatesInput: {
        id: +params.id,
      },
    },
  });
  console.log(subscriptionData);
  return (
    <div className="container mt-32 flex justify-center">
      <div className="flex w-full max-w-screen-sm flex-col justify-center border border-gray-800">
        <h4 className="w-full bg-gray-800 py-5 text-center text-xl text-white">Order #{params.id}</h4>
        <h5 className="p-5 pt-10 text-center text-3xl ">${data?.getOrder.order?.total}</h5>
        <div className="grid gap-6 p-5 text-xl">
          <div className="border-t border-gray-700 pt-5">
            Prepared By: <span className="font-medium">{data?.getOrder.order?.restaurant?.name}</span>
          </div>
          <div className="border-t border-gray-700 pt-5 ">
            Deliver To: <span className="font-medium">{data?.getOrder.order?.customer?.email}</span>
          </div>
          <div className="border-t border-b border-gray-700 py-5">
            Driver: <span className="font-medium">{data?.getOrder.order?.driver?.email || "Not yet."}</span>
          </div>
          {userData?.me.role === "Client" && <span className=" mt-5 mb-3 text-center  text-2xl text-lime-600">Status: {data?.getOrder.order?.status}</span>}
          {userData?.me.role === "Owner" && (
            <>
              {data?.getOrder.order?.status === "Pending" && <button className="btn">Accept Order</button>}
              {data?.getOrder.order?.status === "Cooking" && <button className="btn">Order Cooked</button>}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
