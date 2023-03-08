import { useQuery } from "@apollo/client";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { graphql } from "../../gql";
import { CategoryQuery, CategoryQueryVariables } from "../../gql/graphql";

const CATEGORY_QUERY = graphql(`
  query Category($categoryInput: CategoryInput!) {
    category(input: $categoryInput) {
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

interface ICategoryParams {
  slug: string;
}

export const Category = () => {
  const { slug } = useParams<ICategoryParams>();
  useEffect(() => {});

  const { data, loading, error } = useQuery<CategoryQuery, CategoryQueryVariables>(CATEGORY_QUERY, {
    variables: {
      categoryInput: {
        slug,
      },
    },
  });
  console.log(data);
  return <h1>category</h1>;
};
