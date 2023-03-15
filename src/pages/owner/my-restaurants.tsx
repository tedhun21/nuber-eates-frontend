import { useApolloClient, useQuery } from "@apollo/client";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Restaurant } from "../../components/restaurant";
import { graphql } from "../../gql";
import { MyRestaurantsQuery, MyRestaurantsQueryVariables } from "../../gql/graphql";

export const MY_RESTAURANTS_QUERY = graphql(`
  query myRestaurants {
    myRestaurants {
      ok
      error
      restaurants {
        ...RestaurantParts
      }
    }
  }
`);

export const MyRestaurants = () => {
  const { data } = useQuery<MyRestaurantsQuery, MyRestaurantsQueryVariables>(MY_RESTAURANTS_QUERY);
  const client = useApolloClient();
  useEffect(() => {
    const queryResult = client.readQuery({ query: MY_RESTAURANTS_QUERY });
    const result = queryResult?.myRestaurants.restaurants;
  });
  return (
    <div>
      <Helmet>
        <title>My Restaurants | Nuber Eats</title>
      </Helmet>
      <div className="mx-auto mt-32 max-w-screen-2xl">
        <Link to="/add-restaurant">Create one &rarr;</Link>
        <h2 className="mb-10 text-4xl font-medium">My Restaurants</h2>
      </div>
      {data?.myRestaurants.ok && data?.myRestaurants.restaurants?.length === 0 ? (
        <>
          <h4 className="mb-5 text-xl">You have no restaurnats.</h4>
          <Link to="/add-restaurant">Create one &rarr;</Link>
        </>
      ) : (
        <div>
          {data?.myRestaurants.restaurants?.map((restaurant) => (
            <Restaurant key={restaurant.id} id={restaurant.id} coverImg={restaurant.coverImg} name={restaurant.name} categoryName={restaurant.category?.name} />
          ))}
        </div>
      )}
    </div>
  );
};
