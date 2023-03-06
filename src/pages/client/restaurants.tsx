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
              <div className="flex cursor-pointer flex-col items-center">
                <div className="h-14 w-14 rounded-full bg-cover hover:bg-gray-200" style={{ backgroundImage: `url(${category.coverImg})` }}></div>
                <span className="mt-1 text-center text-sm font-medium">{category.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
