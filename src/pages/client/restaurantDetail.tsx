import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
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
      <div className="bg-gray-800 bg-cover bg-center py-48" style={{ backgroundImage: `url(${data?.restaurant.restaurant?.coverImg})` }}>
        <div className="pl mb-3 w-96 bg-white py-4 pl-24 lg:w-2/5 lg:pl-48">
          <h4 className="text-4xl">{data?.restaurant.restaurant?.name}</h4>
          <h5 className="text-sm font-light">{data?.restaurant.restaurant?.category?.name}</h5>
          <h6 className="text-sm font-light">{data?.restaurant.restaurant?.address}</h6>
        </div>
      </div>
    </div>
  );
};
