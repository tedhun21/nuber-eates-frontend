import { useQuery } from "@apollo/client";
import { Helmet } from "react-helmet-async";
import { Link, useParams } from "react-router-dom";
import { graphql } from "../../gql";

export const MY_RESTAURANT_QUERY = graphql(`
  query myRestaurant($myRestaurantInput: MyRestaurantInput!) {
    myRestaurant(input: $myRestaurantInput) {
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
      <Helmet>
        <title>{data?.myRestaurant.restaurant?.name || "Loading..."}</title>
      </Helmet>
      <div className="bg-gray-700 bg-cover bg-center py-28" style={{ backgroundImage: `url(${data?.myRestaurant.restaurant?.coverImg})` }}></div>
      <div className="container mt-10">
        <h2 className="mb-10 text-4xl font-medium">{data?.myRestaurant.restaurant?.name || "Loading..."}</h2>
        <div>
          <Link to={`/restaurant/${id}/add-dish`} className="mr-8 bg-gray-800 py-2 px-10 text-white">
            Add Dish &rarr;
          </Link>
          <Link to={``} className="bg-lime-700 py-2 px-8 text-white">
            Buy Promotion &rarr;
          </Link>
        </div>
        <div className="mt-10">{data?.myRestaurant.restaurant?.menu.length === 0 ? <h4>Please upload a dish!</h4> : null}</div>
      </div>
    </div>
  );
};
