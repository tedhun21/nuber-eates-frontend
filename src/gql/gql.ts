/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  fragment RestaurantParts on Restaurant {\n    id\n    name\n    coverImg\n    category {\n      name\n    }\n    address\n    isPromoted\n  }\n": types.RestaurantPartsFragmentDoc,
    "\n  fragment CategoryParts on Category {\n    id\n    name\n    coverImg\n    slug\n    restaurantCount\n  }\n": types.CategoryPartsFragmentDoc,
    "\n  fragment DishParts on Dish {\n    id\n    name\n    price\n    photo\n    description\n    options {\n      name\n      extra\n      choices {\n        name\n        extra\n      }\n    }\n  }\n": types.DishPartsFragmentDoc,
    "\n  fragment OrderParts on Order {\n    id\n    createdAt\n    total\n  }\n": types.OrderPartsFragmentDoc,
    "\n  query Me {\n    me {\n      id\n      email\n      role\n      verified\n    }\n  }\n": types.MeDocument,
    "\n  query AllCategories {\n    allCategories {\n      ok\n      error\n      categories {\n        ...CategoryParts\n      }\n    }\n  }\n": types.AllCategoriesDocument,
    "\n  query Category($categoryInput: CategoryInput!) {\n    category(input: $categoryInput) {\n      ok\n      error\n      totalPages\n      totalResults\n      restaurants {\n        ...RestaurantParts\n      }\n    }\n  }\n": types.CategoryDocument,
    "\n  query Restaurant($restaurantInput: RestaurantInput!) {\n    restaurant(input: $restaurantInput) {\n      ok\n      error\n      restaurant {\n        ...RestaurantParts\n        menu {\n          ...DishParts\n        }\n      }\n    }\n  }\n": types.RestaurantDocument,
    "\n  query RestaurantsPage($restaurantsInput: RestaurantsInput!) {\n    allCategories {\n      ok\n      error\n      categories {\n        ...CategoryParts\n      }\n    }\n    restaurants(input: $restaurantsInput) {\n      ok\n      error\n      totalPages\n      results {\n        ...RestaurantParts\n      }\n    }\n  }\n": types.RestaurantsPageDocument,
    "\n  query SearchRestaurant($SearchRestaurantInput: SearchRestaurantInput!) {\n    searchRestaurant(input: $SearchRestaurantInput) {\n      ok\n      error\n      totalPages\n      totalResults\n      restaurants {\n        ...RestaurantParts\n      }\n    }\n  }\n": types.SearchRestaurantDocument,
    "\n  mutation CreateAccount($createAccountInput: CreateAccountInput!) {\n    createAccount(input: $createAccountInput) {\n      ok\n      error\n    }\n  }\n": types.CreateAccountDocument,
    "\n  mutation Login($loginInput: LoginInput!) {\n    login(input: $loginInput) {\n      ok\n      error\n      token\n    }\n  }\n": types.LoginDocument,
    "\n  mutation CreateDish($createDishInput: CreateDishInput!) {\n    createDish(input: $createDishInput) {\n      ok\n      error\n    }\n  }\n": types.CreateDishDocument,
    "\n  mutation CreateRestaurant($createRestaurantInput: CreateRestaurantInput!) {\n    createRestaurant(input: $createRestaurantInput) {\n      ok\n      error\n      restaurantId\n    }\n  }\n": types.CreateRestaurantDocument,
    "\n  query MyRestaurant($myRestaurantInput: MyRestaurantInput!) {\n    myRestaurant(input: $myRestaurantInput) {\n      ok\n      error\n      restaurant {\n        ...RestaurantParts\n        menu {\n          ...DishParts\n        }\n        orders {\n          ...OrderParts\n        }\n      }\n    }\n  }\n": types.MyRestaurantDocument,
    "\n  mutation CreatePayment($createPaymentInput: CreatePaymentInput!) {\n    createPayment(input: $createPaymentInput) {\n      ok\n      error\n    }\n  }\n": types.CreatePaymentDocument,
    "\n  query myRestaurants {\n    myRestaurants {\n      ok\n      error\n      restaurants {\n        ...RestaurantParts\n      }\n    }\n  }\n": types.MyRestaurantsDocument,
    "\n  mutation VerifyEmail($verifyEmailInput: VerifyEmailInput!) {\n    verifyEmail(input: $verifyEmailInput) {\n      ok\n      error\n    }\n  }\n": types.VerifyEmailDocument,
    "\n          fragment VerifiedUser on User {\n            verified\n          }\n        ": types.VerifiedUserFragmentDoc,
    "\n  mutation editProfile($editProfileInput: EditProfileInput!) {\n    editProfile(input: $editProfileInput) {\n      ok\n      error\n    }\n  }\n": types.EditProfileDocument,
    "\n            fragment EditedUser on User {\n              email\n              verified\n            }\n          ": types.EditedUserFragmentDoc,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment RestaurantParts on Restaurant {\n    id\n    name\n    coverImg\n    category {\n      name\n    }\n    address\n    isPromoted\n  }\n"): (typeof documents)["\n  fragment RestaurantParts on Restaurant {\n    id\n    name\n    coverImg\n    category {\n      name\n    }\n    address\n    isPromoted\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment CategoryParts on Category {\n    id\n    name\n    coverImg\n    slug\n    restaurantCount\n  }\n"): (typeof documents)["\n  fragment CategoryParts on Category {\n    id\n    name\n    coverImg\n    slug\n    restaurantCount\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment DishParts on Dish {\n    id\n    name\n    price\n    photo\n    description\n    options {\n      name\n      extra\n      choices {\n        name\n        extra\n      }\n    }\n  }\n"): (typeof documents)["\n  fragment DishParts on Dish {\n    id\n    name\n    price\n    photo\n    description\n    options {\n      name\n      extra\n      choices {\n        name\n        extra\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment OrderParts on Order {\n    id\n    createdAt\n    total\n  }\n"): (typeof documents)["\n  fragment OrderParts on Order {\n    id\n    createdAt\n    total\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Me {\n    me {\n      id\n      email\n      role\n      verified\n    }\n  }\n"): (typeof documents)["\n  query Me {\n    me {\n      id\n      email\n      role\n      verified\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query AllCategories {\n    allCategories {\n      ok\n      error\n      categories {\n        ...CategoryParts\n      }\n    }\n  }\n"): (typeof documents)["\n  query AllCategories {\n    allCategories {\n      ok\n      error\n      categories {\n        ...CategoryParts\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Category($categoryInput: CategoryInput!) {\n    category(input: $categoryInput) {\n      ok\n      error\n      totalPages\n      totalResults\n      restaurants {\n        ...RestaurantParts\n      }\n    }\n  }\n"): (typeof documents)["\n  query Category($categoryInput: CategoryInput!) {\n    category(input: $categoryInput) {\n      ok\n      error\n      totalPages\n      totalResults\n      restaurants {\n        ...RestaurantParts\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Restaurant($restaurantInput: RestaurantInput!) {\n    restaurant(input: $restaurantInput) {\n      ok\n      error\n      restaurant {\n        ...RestaurantParts\n        menu {\n          ...DishParts\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query Restaurant($restaurantInput: RestaurantInput!) {\n    restaurant(input: $restaurantInput) {\n      ok\n      error\n      restaurant {\n        ...RestaurantParts\n        menu {\n          ...DishParts\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query RestaurantsPage($restaurantsInput: RestaurantsInput!) {\n    allCategories {\n      ok\n      error\n      categories {\n        ...CategoryParts\n      }\n    }\n    restaurants(input: $restaurantsInput) {\n      ok\n      error\n      totalPages\n      results {\n        ...RestaurantParts\n      }\n    }\n  }\n"): (typeof documents)["\n  query RestaurantsPage($restaurantsInput: RestaurantsInput!) {\n    allCategories {\n      ok\n      error\n      categories {\n        ...CategoryParts\n      }\n    }\n    restaurants(input: $restaurantsInput) {\n      ok\n      error\n      totalPages\n      results {\n        ...RestaurantParts\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query SearchRestaurant($SearchRestaurantInput: SearchRestaurantInput!) {\n    searchRestaurant(input: $SearchRestaurantInput) {\n      ok\n      error\n      totalPages\n      totalResults\n      restaurants {\n        ...RestaurantParts\n      }\n    }\n  }\n"): (typeof documents)["\n  query SearchRestaurant($SearchRestaurantInput: SearchRestaurantInput!) {\n    searchRestaurant(input: $SearchRestaurantInput) {\n      ok\n      error\n      totalPages\n      totalResults\n      restaurants {\n        ...RestaurantParts\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateAccount($createAccountInput: CreateAccountInput!) {\n    createAccount(input: $createAccountInput) {\n      ok\n      error\n    }\n  }\n"): (typeof documents)["\n  mutation CreateAccount($createAccountInput: CreateAccountInput!) {\n    createAccount(input: $createAccountInput) {\n      ok\n      error\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation Login($loginInput: LoginInput!) {\n    login(input: $loginInput) {\n      ok\n      error\n      token\n    }\n  }\n"): (typeof documents)["\n  mutation Login($loginInput: LoginInput!) {\n    login(input: $loginInput) {\n      ok\n      error\n      token\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateDish($createDishInput: CreateDishInput!) {\n    createDish(input: $createDishInput) {\n      ok\n      error\n    }\n  }\n"): (typeof documents)["\n  mutation CreateDish($createDishInput: CreateDishInput!) {\n    createDish(input: $createDishInput) {\n      ok\n      error\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateRestaurant($createRestaurantInput: CreateRestaurantInput!) {\n    createRestaurant(input: $createRestaurantInput) {\n      ok\n      error\n      restaurantId\n    }\n  }\n"): (typeof documents)["\n  mutation CreateRestaurant($createRestaurantInput: CreateRestaurantInput!) {\n    createRestaurant(input: $createRestaurantInput) {\n      ok\n      error\n      restaurantId\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query MyRestaurant($myRestaurantInput: MyRestaurantInput!) {\n    myRestaurant(input: $myRestaurantInput) {\n      ok\n      error\n      restaurant {\n        ...RestaurantParts\n        menu {\n          ...DishParts\n        }\n        orders {\n          ...OrderParts\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query MyRestaurant($myRestaurantInput: MyRestaurantInput!) {\n    myRestaurant(input: $myRestaurantInput) {\n      ok\n      error\n      restaurant {\n        ...RestaurantParts\n        menu {\n          ...DishParts\n        }\n        orders {\n          ...OrderParts\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreatePayment($createPaymentInput: CreatePaymentInput!) {\n    createPayment(input: $createPaymentInput) {\n      ok\n      error\n    }\n  }\n"): (typeof documents)["\n  mutation CreatePayment($createPaymentInput: CreatePaymentInput!) {\n    createPayment(input: $createPaymentInput) {\n      ok\n      error\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query myRestaurants {\n    myRestaurants {\n      ok\n      error\n      restaurants {\n        ...RestaurantParts\n      }\n    }\n  }\n"): (typeof documents)["\n  query myRestaurants {\n    myRestaurants {\n      ok\n      error\n      restaurants {\n        ...RestaurantParts\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation VerifyEmail($verifyEmailInput: VerifyEmailInput!) {\n    verifyEmail(input: $verifyEmailInput) {\n      ok\n      error\n    }\n  }\n"): (typeof documents)["\n  mutation VerifyEmail($verifyEmailInput: VerifyEmailInput!) {\n    verifyEmail(input: $verifyEmailInput) {\n      ok\n      error\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n          fragment VerifiedUser on User {\n            verified\n          }\n        "): (typeof documents)["\n          fragment VerifiedUser on User {\n            verified\n          }\n        "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation editProfile($editProfileInput: EditProfileInput!) {\n    editProfile(input: $editProfileInput) {\n      ok\n      error\n    }\n  }\n"): (typeof documents)["\n  mutation editProfile($editProfileInput: EditProfileInput!) {\n    editProfile(input: $editProfileInput) {\n      ok\n      error\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n            fragment EditedUser on User {\n              email\n              verified\n            }\n          "): (typeof documents)["\n            fragment EditedUser on User {\n              email\n              verified\n            }\n          "];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;