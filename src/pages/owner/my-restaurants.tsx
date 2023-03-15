import { useQuery } from "@apollo/client";
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
  return (
    <div>
      <Helmet>
        <title>My Restaurants | Nuber Eats</title>
      </Helmet>
      <div className="mx-auto mt-32 max-w-screen-2xl">
        <h2 className="mb-10 text-4xl font-medium">My Restaurants</h2>
      </div>
      {data?.myRestaurants.ok && data?.myRestaurants.restaurants?.length === 0 ? (
        <>
          <h4 className="mb-5 text-xl">You have no restaurnats.</h4>
          <Link to="/add-restaurant">Create one &rarr;</Link>
        </>
      ) : (
        <div className="mx-3 mt-16 grid gap-7 gap-y-10 gap-x-5 md:grid-cols-3">
          {data?.myRestaurants.restaurants?.map((restaurant) => (
            <Restaurant key={restaurant.id} id={restaurant.id} coverImg={restaurant.coverImg} name={restaurant.name} categoryName={restaurant.category?.name} />
          ))}
        </div>
      )}
    </div>
  );
};
