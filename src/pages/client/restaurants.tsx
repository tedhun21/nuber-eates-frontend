import { useQuery } from "@apollo/client";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { Restaurant } from "../../components/restaurant";
import { graphql } from "../../gql";
import { RestaurantsPageQuery, RestaurantsPageQueryVariables } from "../../gql/graphql";

interface IFormProps {
  searchTerm: string;
}

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
  const history = useHistory();
  const [page, setPage] = useState(1);
  const { data, loading } = useQuery<RestaurantsPageQuery, RestaurantsPageQueryVariables>(RESTAURANTS_QUERY, {
    variables: {
      restaurantsInput: {
        page,
      },
    },
  });
  const onNextPageClick = () => {
    setPage((current) => current + 1);
  };
  const onPrevPageClick = () => {
    setPage((current) => current - 1);
  };
  const { register, handleSubmit } = useForm<IFormProps>();
  const onSearchSubmit = ({ searchTerm }: IFormProps) => {
    history.push({
      pathname: "/search",
      search: `?term=${searchTerm}`,
    });
  };
  return (
    <div>
      <Helmet>
        <title>Home | Nuber Eats</title>
      </Helmet>
      <form onSubmit={handleSubmit(onSearchSubmit)} className="flex w-full items-center justify-center bg-gray-800 py-40">
        <input
          {...register("searchTerm", { required: true, min: 3 })}
          className="input w-3/4 rounded-md border-0 md:w-3/12"
          type="Search"
          placeholder="Search Restaurants"
        />
      </form>
      {!loading && (
        <div className="mx-auto mt-8 max-w-screen-2xl pb-20">
          <div className="mx-auto flex max-w-screen-sm justify-around">
            {data?.allCategories.categories?.map((category) => (
              <div key={category.id} className="group flex cursor-pointer flex-col items-center">
                <div className="h-16 w-16 rounded-full bg-cover group-hover:bg-gray-100" style={{ backgroundImage: `url(${category.coverImg})` }}></div>
                <span className="mt-1 text-center text-sm font-medium">{category.name}</span>
              </div>
            ))}
          </div>
          <div className="mt-16 grid gap-7 gap-x-5 gap-y-10 md:grid-cols-3">
            {data?.restaurants.results?.map((restaurant) => (
              <Restaurant
                key={restaurant.id}
                id={restaurant.id}
                coverImg={restaurant.coverImg}
                name={restaurant.name}
                categoryName={restaurant.category?.name}
              />
            ))}
          </div>
          <div className="mx-auto mt-10 grid max-w-md grid-cols-3 items-center text-center">
            {page > 1 ? (
              <button onClick={onPrevPageClick} className="text-2xl font-medium">
                &larr;
              </button>
            ) : (
              <div></div>
            )}
            <span className="mx-5">
              Page {page} of {data?.restaurants.totalPages}
            </span>
            {page !== data?.restaurants.totalPages ? (
              <button onClick={onNextPageClick} className="text-2xl font-medium">
                &rarr;
              </button>
            ) : (
              <div></div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
