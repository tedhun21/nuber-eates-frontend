import { useLazyQuery } from "@apollo/client";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useHistory, useLocation } from "react-router-dom";
import { graphql } from "../../gql";
import { SearchRestaurantQuery, SearchRestaurantQueryVariables } from "../../gql/graphql";

const SEARCH_RESTAURANT = graphql(`
  query SearchRestaurant($SearchRestaurantInput: SearchRestaurantInput!) {
    searchRestaurant(input: $SearchRestaurantInput) {
      ok
      error
      totalPages
      totalResults
      restaurants {
        ...RestaurantParts
      }
    }
  }
`);

export const Search = () => {
  const location = useLocation();
  const history = useHistory();
  const [queryReadyToStart, { loading, data, called }] = useLazyQuery<SearchRestaurantQuery, SearchRestaurantQueryVariables>(SEARCH_RESTAURANT);
  useEffect(() => {
    const [_, query] = location.search.split("?term=");
    if (!query) {
      history.replace("/");
    }
    queryReadyToStart({
      variables: {
        SearchRestaurantInput: {
          page: 1,
          query,
        },
      },
    });
  }, [history, location]);
  console.log(loading, data, called);
  return (
    <div>
      <Helmet>
        <title>Search | Nuber Eats</title>
      </Helmet>
      <h1>Search page</h1>
    </div>
  );
};
