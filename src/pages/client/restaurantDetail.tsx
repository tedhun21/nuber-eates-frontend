import { useMutation, useQuery } from "@apollo/client";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useHistory, useParams } from "react-router-dom";
import { Dish } from "../../components/dish";
import { graphql } from "../../gql";
import { CreateOrderItemInput, CreateOrderMutation, CreateOrderMutationVariables } from "../../gql/graphql";
import { DishOption } from "../../components/dish-option";

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
      orderId
    }
  }
`);

export const RestaurantDetail = () => {
  const params = useParams<IRestaurantParams>();
  const history = useHistory()
  const { data, loading, error } = useQuery(RESTAURANT_QUERY, {
    variables: {
      restaurantInput: {
        restaurantId: +params.id,
      },
    },
  });
  const [orderStarted, setOrderStarted] = useState(false);
  const [orderItems, setOrderItems] = useState<CreateOrderItemInput[]>([]);
  const triggerStartOrder = () => {
    setOrderStarted(true);
  };
  const getItem = (dishId: number) => {
    return orderItems.find((order) => order.dishId === dishId);
  };
  const isSelected = (dishId: number) => {
    return Boolean(getItem(dishId));
  };
  const addItemToOrder = (dishId: number) => {
    if (isSelected(dishId)) {
      return;
    }
    setOrderItems((current) => [{ dishId, options: [] }, ...current]);
  };
  const removeFromOrder = (dishId: number) => {
    setOrderItems((current) => current.filter((dish) => dish.dishId !== dishId));
  };
  const addOptionToItem = (dishId: number, optionName: string) => {
    if (!isSelected(dishId)) {
      return;
    }
    const oldItem = getItem(dishId);
    if (oldItem) {
      const hasOption = Boolean(oldItem.options?.find((aOption) => aOption.name === optionName));
      if (!hasOption) {
        removeFromOrder(dishId);
        setOrderItems((current) => [{ dishId, options: [{ name: optionName }, ...oldItem.options!] }, ...current]);
      }
    }
  };
  const getOptionFromItem = (item: CreateOrderItemInput, optionName: string) => {
    return item.options?.find((option) => option.name === optionName);
  };
  const isOptionSelected = (dishId: number, optionName: string) => {
    const item = getItem(dishId);
    if (item) {
      return Boolean(getOptionFromItem(item, optionName));
    }
    return false;
  };
  const removeOptionFromItem = (dishId: number, optionName: string) => {
    if (!isSelected(dishId)) {
      return;
    }
    const oldItem = getItem(dishId);
    if (oldItem) {
      removeFromOrder(dishId);
      setOrderItems((current) => [{ dishId, options: oldItem.options?.filter((option) => option.name !== optionName), ...current }]);
      return;
    }
  };
  const triggerCancelOrder = () => {
    setOrderStarted(false);
    setOrderItems([]);
  };
  const onCompleted = (data: CreateOrderMutation) => {
    const {
      createOrder: { ok, orderId },
    } = data;
    if (ok) {
      history.push(`/orders/${orderId}`)
    }
  };
  const [createOrderMutation, { loading: placingOrder }] = useMutation<CreateOrderMutation, CreateOrderMutationVariables>(CREATE_ORDER_MUTATION, {
    onCompleted,
  });
  const triggerConfirmOrder = () => {
    if (orderItems.length === 0) {
      alert("Can't place empty order");
      return;
    }
    const ok = window.confirm("You are about to place an order");
    if (ok) {
      createOrderMutation({ variables: { createOrderInput: { restaurantId: +params.id, items: orderItems } } });
    }
  };
  console.log(orderItems);
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
        {!orderStarted && (
          <button onClick={triggerStartOrder} className="btn px-10">
            Start Order
          </button>
        )}
        {orderStarted && (
          <div className="flex items-center">
            <button onClick={triggerConfirmOrder} className="btn mr-2 px-10">
              Confirm Order
            </button>
            <button onClick={triggerCancelOrder} className="btn bg-black px-10 hover:bg-black">
              Cancel Order
            </button>
          </div>
        )}
        <div className="mt-16 grid w-full gap-x-5 gap-y-10 md:grid-cols-3">
          {data?.restaurant.restaurant?.menu.map((dish, index) => (
            <Dish
              isSelected={isSelected(dish.id)}
              id={dish.id}
              key={index}
              name={dish.name}
              price={dish.price}
              description={dish.description}
              isCustomer={true}
              options={dish.options}
              orderStarted={orderStarted}
              addItemToOrder={addItemToOrder}
              removeFromOrder={removeFromOrder}
            >
              {dish.options?.map((option, index) => (
                <DishOption
                  key={index}
                  dishId={dish.id}
                  isSelected={isOptionSelected(dish.id, option.name)}
                  name={option.name}
                  extra={option.extra}
                  addOptionToItem={addOptionToItem}
                  removeOptionFromItem={removeOptionFromItem}
                />
              ))}
            </Dish>
          ))}
        </div>
      </div>
    </div>
  );
};
