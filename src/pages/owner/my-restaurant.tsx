import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { graphql } from "../../gql";

const MY_RESTAURANT_QUERY = graphql(`
  query MyRestaurant($myRestaurantInput: MyRestaurantInput!) {
    myRestaurant(input: $myRestaurantInput) {
      ok
      error
      restaurant {
        ...RestaurantParts
      }
    }
  }
`);

interface IParams {
  id: string;
}

export const MyRestaurant = () => {
  const { id } = useParams<IParams>();
  const { data } = useQuery(MY_RESTAURANT_QUERY, {
    variables: {
      myRestaurantInput: {
        id: +id,
      },
    },
  });
  console.log(data);

  return (
    <div>
      <div className="bg-gray-800 bg-cover bg-center py-48" style={{ backgroundImage: `url(${data?.myRestaurant.restaurant?.coverImg})` }}>
        <div className="mb-3 w-64 bg-white py-4 pl-24 lg:w-2/5 lg:pl-56">
          <h4 className="text-3xl">{data?.myRestaurant.restaurant?.name}</h4>
          <h5 className="text-sm font-light">{data?.myRestaurant.restaurant?.category?.name}</h5>
          <h6 className="text-sm font-light">{data?.myRestaurant.restaurant?.address}</h6>
        </div>
      </div>
    </div>
  );
};
