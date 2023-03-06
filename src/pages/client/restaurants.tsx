import { useQuery } from "@apollo/client";
import { graphql } from "../../gql";
import { RestaurantsPageQuery, RestaurantsPageQueryVariables } from "../../gql/graphql";

const RESTAURANTS_QUERY = graphql(`
  query RestaurantsPage($restaurantsInput: RestaurantsInput!) {
    allCategories {
      ok
      error
      categories {
        id
        name
        coverImg
        slug
        restaurantCount
      }
    }
    restaurants(input: $restaurantsInput) {
      ok
      error
      totalPages
      totalResults
      results {
        id
        name
        coverImg
        category {
          name
        }
        address
        isPromoted
      }
    }
  }
`);

export const Restaurants = () => {
  const { data, loading, error } = useQuery<RestaurantsPageQuery, RestaurantsPageQueryVariables>(RESTAURANTS_QUERY, {
    variables: {
      restaurantsInput: {
        page: 1,
      },
    },
  });
  console.log(data);
  return (
    <div>
      <form className="flex w-full items-center justify-center bg-gray-800 py-40">
        <input className="input w-3/12 rounded-md border-0" type="Search" placeholder="Search Restaurants" />
      </form>
      {!loading && (
        <div className="mx-auto mt-8 max-w-screen-2xl">
          <div className="mx-auto flex max-w-screen-sm justify-around">
            {data?.allCategories.categories?.map((category) => (
              <div key={category.id} className="group flex cursor-pointer flex-col items-center">
                <div className="h-16 w-16 rounded-full bg-cover group-hover:bg-gray-100" style={{ backgroundImage: `url(${category.coverImg})` }}></div>
                <span className="mt-1 text-center text-sm font-medium">{category.name}</span>
              </div>
            ))}
          </div>
          <div className="mt-10 grid grid-cols-3 gap-7 gap-x-5 gap-y-10">
            {data?.restaurants.results?.map((restaurant) => (
              <div key={restaurant.id}>
                <div style={{ backgroundImage: `url(${restaurant.coverImg})` }} className="mb-3 bg-red-500 bg-cover bg-center py-28"></div>
                <h3 className="text-xl font-medium">{restaurant.name}</h3>
                <span className="border-t-2 border-gray-200">{restaurant.category?.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
