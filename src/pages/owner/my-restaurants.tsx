import { useQuery } from "@apollo/client";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { graphql } from "../../gql";
import { MyRestaurantsQuery, MyRestaurantsQueryVariables } from "../../gql/graphql";

const MY_RESTAURANTS_QUERY = graphql(`
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
  const { data, loading, error } = useQuery<MyRestaurantsQuery, MyRestaurantsQueryVariables>(MY_RESTAURANTS_QUERY);
  console.log(data);
  return (
    <div>
      <Helmet>
        <title>My Restaurants | Nuber Eats</title>
      </Helmet>
      <div className="mx-auto mt-32 max-w-screen-2xl">
        <h2 className="mb-10 text-4xl font-medium">My Restaurants</h2>
      </div>
      {data?.myRestaurants.ok && data?.myRestaurants.restaurants?.length === 0 && "No restaurants here. create one!" && (
        <>
          <h4 className="mb-5 text-xl">You have no restaurnats.</h4>
          <Link to="/add-restaurant">Create one &rarr;</Link>
        </>
      )}
    </div>
  );
};
