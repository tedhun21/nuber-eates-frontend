import { useMutation, useQuery } from "@apollo/client";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import { Dish } from "../../components/dish";
import { graphql } from "../../gql";
import { CreateOrderItemInput } from "../../gql/graphql";

interface IRestaurantParams {
  id: string;
}

const RESTAURANT_QUERY = graphql(`
  query Restaurant($restaurantInput: RestaurantInput!) {
    restaurant(input: $restaurantInput) {
      ok
      error
      restaurant {
        ...RestaurantParts
        menu {
          ...DishParts
        }
      }
    }
  }
`);

const CREATE_ORDER_MUTATION = graphql(`
  mutation CreateOrder($createOrderInput: CreateOrderInput!) {
    createOrder(input: $createOrderInput) {
      ok
      error
    }
  }
`);

export const RestaurantDetail = () => {
  const { id } = useParams<IRestaurantParams>();
  const { data, loading, error } = useQuery(RESTAURANT_QUERY, {
    variables: {
      restaurantInput: {
        restaurantId: +id,
      },
    },
  });
  const [createOrderMutation] = useMutation(CREATE_ORDER_MUTATION);
  const [orderStarted, setOrderStarted] = useState(false);
  const [orderItems, setOrderItems] = useState<CreateOrderItemInput[]>([]);
  const triggerStartOrder = () => {
    setOrderStarted(true);
  };
  const addItemToOrder = (dishId: number) => {
    setOrderItems((current) => [{ dishId }]);
  };
  return (
    <div>
      <Helmet>
        <title>{data?.restaurant.restaurant?.name || ""} | Nuber Eats</title>
      </Helmet>
      <div className="bg-gray-800 bg-cover bg-center py-48" style={{ backgroundImage: `url(${data?.restaurant.restaurant?.coverImg})` }}>
        <div className="mb-3 w-64 bg-white py-4 pl-24 lg:w-2/5 lg:pl-56">
          <h4 className="text-3xl">{data?.restaurant.restaurant?.name}</h4>
          <h5 className="mb-2 text-sm font-light">{data?.restaurant.restaurant?.category?.name}</h5>
          <h6 className="text-sm font-light">{data?.restaurant.restaurant?.address}</h6>
        </div>
      </div>
      <div className="container mt-20 flex flex-col items-end pb-32">
        <button onClick={triggerStartOrder} className="btn px-10">
          Start Order
        </button>
        <div className="mt-16 grid w-full gap-x-5 gap-y-10 md:grid-cols-3">
          {data?.restaurant.restaurant?.menu.map((dish, index) => (
            <Dish
              id={dish.id}
              key={index}
              name={dish.name}
              price={dish.price}
              description={dish.description}
              isCustomer={true}
              options={dish.options}
              orderStarted={orderStarted}
              addItemToOrder={addItemToOrder}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
