import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Restaurant } from "../../components/restaurant";
import { graphql } from "../../gql";
import { AllCategoriesQuery, AllCategoriesQueryVariables, CategoryQuery, CategoryQueryVariables } from "../../gql/graphql";

const CATEGORIES_QUERY = graphql(`
  query AllCategories {
    allCategories {
      ok
      error
      categories {
        ...CategoryParts
      }
    }
  }
`);

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
  const [page, setPage] = useState(1);
  const { slug } = useParams<ICategoryParams>();
  useEffect(() => {});
  const { data: categoriesData } = useQuery<AllCategoriesQuery, AllCategoriesQueryVariables>(CATEGORIES_QUERY);
  const { data: categoryData } = useQuery<CategoryQuery, CategoryQueryVariables>(CATEGORY_QUERY, {
    variables: {
      categoryInput: {
        slug,
      },
    },
  });
  const onPrevClick = () => {
    setPage((current) => current - 1);
  };
  const onNextClick = () => {
    setPage((current) => current + 1);
  };
  return (
    <div>
      <div className="mx-auto flex max-w-screen-sm justify-around">
        {categoriesData?.allCategories.categories?.map((category) => (
          <Link key={category.id} to={`/category/${category.slug}`}>
            <div className="group flex cursor-pointer flex-col items-center">
              <div className="h-16 w-16 rounded-full bg-cover group-hover:bg-gray-100" style={{ backgroundImage: `url(${category.coverImg})` }}></div>
              <span className="mt-1 text-center text-sm font-medium">{category.name}</span>
            </div>
          </Link>
        ))}
      </div>
      <div className="mx-3 mt-16 grid gap-7 gap-x-5 gap-y-10 md:grid-cols-3">
        {categoryData?.category.restaurants?.map((restaurant) => (
          <Restaurant key={restaurant.id} id={restaurant.id} coverImg={restaurant.coverImg} name={restaurant.name} categoryName={restaurant.category?.name} />
        ))}
      </div>
      <div className="mx-auto mt-10 grid max-w-md grid-cols-3 items-center justify-center pb-20 text-center">
        {page > 1 ? (
          <button onClick={onPrevClick} className="text-2xl font-medium">
            &larr;
          </button>
        ) : (
          <div></div>
        )}
        <span>
          Page {page} of {categoryData?.category.totalPages}
        </span>
        {page !== categoryData?.category.totalPages ? (
          <button onClick={onNextClick} className="text-2xl font-medium">
            &rarr;
          </button>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};
