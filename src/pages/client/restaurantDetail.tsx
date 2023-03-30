import { useQuery } from "@apollo/client";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import { Dish } from "../../components/dish";
import { graphql } from "../../gql";

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

export const RestaurantDetail = () => {
  const { id } = useParams<IRestaurantParams>();
  const { data, loading, error } = useQuery(RESTAURANT_QUERY, {
    variables: {
      restaurantInput: {
        restaurantId: +id,
      },
    },
  });
  console.log(data);
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
      <div className="container mt-16 grid gap-x-5 gap-y-10 md:grid-cols-3">
        {data?.restaurant.restaurant?.menu.map((dish) => (
          <Dish key={dish.id} name={dish.name} price={dish.price} description={dish.description} isCustomer={true} options={dish.options} />
        ))}
      </div>
    </div>
  );
};
