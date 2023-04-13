import { useParams } from "react-router-dom";
import { graphql } from "../gql";
import { useMutation, useQuery, useSubscription } from "@apollo/client";
import {
  EditOrderMutation,
  EditOrderMutationVariables,
  GetOrderQuery,
  GetOrderQueryVariables,
  OrderStatus,
  OrderUpdatesSubscription,
  OrderUpdatesSubscriptionVariables,
  UserRole,
} from "../gql/graphql";
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

const EDIT_ORDER_MUTATION = graphql(`
  mutation EditOrder($editOrderInput: EditOrderInput!) {
    editOrder(input: $editOrderInput) {
      ok
      error
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
  const [editOrderMutation] = useMutation<EditOrderMutation, EditOrderMutationVariables>(EDIT_ORDER_MUTATION);
  const onButtonClick = (newStatus: OrderStatus) => {
    editOrderMutation({
      variables: {
        editOrderInput: {
          id: +params.id,
          status: newStatus,
        },
      },
    });
  };

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
          {userData?.me.role === UserRole.Client && (
            <span className=" mt-5 mb-3 text-center  text-2xl text-lime-600">Status: {data?.getOrder.order?.status}</span>
          )}
          {userData?.me.role === UserRole.Owner && (
            <>
              {data?.getOrder.order?.status === OrderStatus.Pending && (
                <button onClick={() => onButtonClick(OrderStatus.Cooking)} className="btn">
                  Accept Order
                </button>
              )}
              {data?.getOrder.order?.status === OrderStatus.Cooking && (
                <button onClick={() => onButtonClick(OrderStatus.Cooked)} className="btn">
                  Order Cooked
                </button>
              )}
              {data?.getOrder.order?.status !== OrderStatus.Cooking && data?.getOrder.order?.status !== OrderStatus.Pending && (
                <span className=" mt-5 mb-3 text-center  text-2xl text-lime-600">Status: {data?.getOrder.order?.status}</span>
              )}
            </>
          )}
          {userData?.me.role === UserRole.Delivery && (
            <>
              {data?.getOrder.order?.status === OrderStatus.Cooked && (
                <button onClick={() => onButtonClick(OrderStatus.PickedUp)} className="btn">
                  Picked Up
                </button>
              )}
              {data?.getOrder.order?.status === OrderStatus.PickedUp && (
                <button onClick={() => onButtonClick(OrderStatus.Delivered)} className="btn">
                  Order Delivered
                </button>
              )}
            </>
          )}
          {data?.getOrder.order?.status === OrderStatus.Delivered && (
            <span className=" mt-5 mb-3 text-center  text-2xl text-lime-600">Thank you for using Nuber Eats</span>
          )}
        </div>
      </div>
    </div>
  );
};
