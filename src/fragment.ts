import { graphql } from "./gql";

export const RESTAURANT_FRAGMENT = graphql(`
  fragment RestaurantParts on Restaurant {
    id
    name
    coverImg
    category {
      name
    }
    address
    isPromoted
  }
`);

export const CATEGORY_FRAGMENTS = graphql(`
  fragment CategoryParts on Category {
    id
    name
    coverImg
    slug
    restaurantCount
  }
`);
