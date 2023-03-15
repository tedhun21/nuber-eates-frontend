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

export const DISH_FRAGMENT = graphql(`
  fragment DishParts on Dish {
    id
    name
    price
    photo
    description
    options {
      name
      extra
      choices {
        name
        extra
      }
    }
  }
`);
