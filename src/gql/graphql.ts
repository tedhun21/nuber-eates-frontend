/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: any;
};

export type AllCategoriesOutput = {
  categories: Maybe<Array<Category>>;
  error: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type Category = {
  coverImg: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  id: Scalars['Float'];
  name: Scalars['String'];
  restaurantCount: Scalars['Float'];
  restaurants: Maybe<Array<Restaurant>>;
  slug: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type CategoryInput = {
  page: Scalars['Int'];
  slug: Scalars['String'];
};

export type CategoryOutput = {
  category: Maybe<Category>;
  error: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
  restaurants: Maybe<Array<Restaurant>>;
  totalPages: Maybe<Scalars['Int']>;
  totalResults: Maybe<Scalars['Int']>;
};

export type CreateAccountInput = {
  email: Scalars['String'];
  password: Scalars['String'];
  role: UserRole;
};

export type CreateAccountOutput = {
  error: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type CreateDishInput = {
  description: Scalars['String'];
  name: Scalars['String'];
  options: InputMaybe<Array<DishOptionInputType>>;
  price: Scalars['Int'];
  restaurantId: Scalars['Int'];
};

export type CreateDishOutput = {
  error: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type CreateOrderInput = {
  items: Array<CreateOrderItemInput>;
  restaurantId: Scalars['Int'];
};

export type CreateOrderItemInput = {
  dishId: Scalars['Int'];
  options: Array<OrderItemOptionInputType>;
};

export type CreateOrderOutput = {
  error: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type CreatePaymentInput = {
  restaurantId: Scalars['Int'];
  transactionId: Scalars['String'];
};

export type CreatePaymentOutput = {
  error: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type CreateRestaurantInput = {
  address: Scalars['String'];
  categoryName: Scalars['String'];
  coverImg: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
};

export type CreateRestaurantOutput = {
  error: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type DeleteDishOutput = {
  error: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type DeleteRestaurantInput = {
  restaurantId: Scalars['Float'];
};

export type DeleteRestaurantOutput = {
  error: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type Dish = {
  createdAt: Scalars['DateTime'];
  description: Scalars['String'];
  id: Scalars['Float'];
  name: Scalars['String'];
  options: Maybe<Array<DishOption>>;
  photo: Maybe<Scalars['String']>;
  price: Scalars['Int'];
  restaurant: Restaurant;
  updatedAt: Scalars['DateTime'];
};

export type DishChoice = {
  extra: Maybe<Scalars['Int']>;
  name: Scalars['String'];
};

export type DishChoiceInputType = {
  extra: InputMaybe<Scalars['Int']>;
  name: Scalars['String'];
};

export type DishOption = {
  choices: Maybe<Array<DishChoice>>;
  extra: Maybe<Scalars['Int']>;
  name: Scalars['String'];
};

export type DishOptionInputType = {
  choices: InputMaybe<Array<DishChoiceInputType>>;
  extra: InputMaybe<Scalars['Int']>;
  name: Scalars['String'];
};

export type EditDishInput = {
  description: InputMaybe<Scalars['String']>;
  dishId: Scalars['Int'];
  name: InputMaybe<Scalars['String']>;
  options: InputMaybe<Array<DishOptionInputType>>;
  photo: InputMaybe<Scalars['String']>;
  price: InputMaybe<Scalars['Int']>;
};

export type EditDishOutput = {
  error: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type EditOrderInput = {
  id: Scalars['Float'];
  status: OrderStatus;
};

export type EditOrderOutput = {
  error: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type EditProfileInput = {
  email: InputMaybe<Scalars['String']>;
  password: InputMaybe<Scalars['String']>;
};

export type EditProfileOutput = {
  error: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type EditRestaurantInput = {
  address: InputMaybe<Scalars['String']>;
  categoryName: InputMaybe<Scalars['String']>;
  coverImg: InputMaybe<Scalars['String']>;
  name: InputMaybe<Scalars['String']>;
  restaurantId: Scalars['Float'];
};

export type EditRestaurantOutput = {
  error: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type GetOrderInput = {
  id: Scalars['Float'];
};

export type GetOrderOutput = {
  error: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
  order: Maybe<Order>;
};

export type GetOrdersInput = {
  status: InputMaybe<OrderStatus>;
};

export type GetOrdersOutput = {
  error: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
  orders: Maybe<Array<Order>>;
};

export type GetPaymentsOutput = {
  error: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
  payments: Maybe<Array<Payment>>;
};

export type LoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type LoginOutput = {
  error: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
  token: Maybe<Scalars['String']>;
};

export type Mutation = {
  createAccount: CreateAccountOutput;
  createDish: CreateDishOutput;
  createOrder: CreateOrderOutput;
  createPayment: CreatePaymentOutput;
  createRestaurant: CreateRestaurantOutput;
  deleteDish: DeleteDishOutput;
  deleteRestaurant: DeleteRestaurantOutput;
  editDish: EditDishOutput;
  editOrder: EditOrderOutput;
  editProfile: EditProfileOutput;
  editRestaurant: EditRestaurantOutput;
  login: LoginOutput;
  takeOrder: TakeOrderOutput;
  verifyEmail: VerifyEmailOutput;
};


export type MutationCreateAccountArgs = {
  input: CreateAccountInput;
};


export type MutationCreateDishArgs = {
  input: CreateDishInput;
};


export type MutationCreateOrderArgs = {
  input: CreateOrderInput;
};


export type MutationCreatePaymentArgs = {
  input: CreatePaymentInput;
};


export type MutationCreateRestaurantArgs = {
  input: CreateRestaurantInput;
};


export type MutationDeleteDishArgs = {
  dishId: Scalars['Int'];
};


export type MutationDeleteRestaurantArgs = {
  input: DeleteRestaurantInput;
};


export type MutationEditDishArgs = {
  input: EditDishInput;
};


export type MutationEditOrderArgs = {
  input: EditOrderInput;
};


export type MutationEditProfileArgs = {
  input: EditProfileInput;
};


export type MutationEditRestaurantArgs = {
  input: EditRestaurantInput;
};


export type MutationLoginArgs = {
  input: LoginInput;
};


export type MutationTakeOrderArgs = {
  input: TakeOrderInput;
};


export type MutationVerifyEmailArgs = {
  input: VerifyEmailInput;
};

export type Order = {
  createdAt: Scalars['DateTime'];
  customer: User;
  driver: Maybe<User>;
  id: Scalars['Float'];
  items: Array<OrderItem>;
  restaurant: Maybe<Restaurant>;
  status: OrderStatus;
  total: Maybe<Scalars['Float']>;
  updatedAt: Scalars['DateTime'];
};

export type OrderItem = {
  createdAt: Scalars['DateTime'];
  dish: Dish;
  id: Scalars['Float'];
  options: Maybe<Array<OrderItemOption>>;
  updatedAt: Scalars['DateTime'];
};

export type OrderItemOption = {
  choice: Maybe<Scalars['String']>;
  name: Scalars['String'];
};

export type OrderItemOptionInputType = {
  choice: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
};

export type OrderStatus =
  | 'Cooked'
  | 'Cooking'
  | 'Delivered'
  | 'Pending'
  | 'PickedUp';

export type OrderUpdatesInput = {
  id: Scalars['Float'];
};

export type Payment = {
  createdAt: Scalars['DateTime'];
  id: Scalars['Float'];
  restaurant: Restaurant;
  restaurantId: Scalars['Int'];
  transactionId: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  user: User;
};

export type Query = {
  allCategories: AllCategoriesOutput;
  category: CategoryOutput;
  getOrder: GetOrderOutput;
  getOrders: GetOrdersOutput;
  getPayments: GetPaymentsOutput;
  me: User;
  restaurant: RestaurantOutput;
  restaurants: RestaurantsOutput;
  searchRestaurant: SearchRestaurantOutput;
  userProfile: UserProfileOutput;
};


export type QueryCategoryArgs = {
  input: CategoryInput;
};


export type QueryGetOrderArgs = {
  input: GetOrderInput;
};


export type QueryGetOrdersArgs = {
  input: GetOrdersInput;
};


export type QueryRestaurantArgs = {
  input: RestaurantInput;
};


export type QueryRestaurantsArgs = {
  input: RestaurantsInput;
};


export type QuerySearchRestaurantArgs = {
  input: SearchRestaurantInput;
};


export type QueryUserProfileArgs = {
  userId: Scalars['Float'];
};

export type Restaurant = {
  address: Scalars['String'];
  category: Maybe<Category>;
  coverImg: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  id: Scalars['Float'];
  isPromoted: Scalars['Boolean'];
  menu: Array<Dish>;
  name: Scalars['String'];
  orders: Array<Order>;
  owner: User;
  promotedUntil: Maybe<Scalars['DateTime']>;
  updatedAt: Scalars['DateTime'];
};

export type RestaurantInput = {
  restaurantId: Scalars['Int'];
};

export type RestaurantOutput = {
  error: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
  restaurant: Maybe<Restaurant>;
};

export type RestaurantsInput = {
  page: Scalars['Int'];
};

export type RestaurantsOutput = {
  error: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
  results: Maybe<Array<Restaurant>>;
  totalPages: Maybe<Scalars['Int']>;
  totalResults: Maybe<Scalars['Int']>;
};

export type SearchRestaurantInput = {
  page: Scalars['Int'];
  query: Scalars['String'];
};

export type SearchRestaurantOutput = {
  error: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
  restaurants: Maybe<Array<Restaurant>>;
  totalPages: Maybe<Scalars['Int']>;
  totalResults: Maybe<Scalars['Int']>;
};

export type Subscription = {
  cookedOrders: Order;
  orderUpdates: Order;
  pendingOrders: Order;
};


export type SubscriptionOrderUpdatesArgs = {
  input: OrderUpdatesInput;
};

export type TakeOrderInput = {
  id: Scalars['Float'];
};

export type TakeOrderOutput = {
  error: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type User = {
  createdAt: Scalars['DateTime'];
  email: Scalars['String'];
  id: Scalars['Float'];
  orders: Array<Order>;
  password: Scalars['String'];
  payments: Array<Payment>;
  restaurants: Array<Restaurant>;
  rides: Maybe<Array<Order>>;
  role: UserRole;
  updatedAt: Scalars['DateTime'];
  verified: Scalars['Boolean'];
};

export type UserProfileOutput = {
  error: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
  user: Maybe<User>;
};

export type UserRole =
  | 'Client'
  | 'Delivery'
  | 'Owner';

export type VerifyEmailInput = {
  code: Scalars['String'];
};

export type VerifyEmailOutput = {
  error: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { login: { ok: boolean, error: string | null, token: string | null } };


export const LoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Login"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"login"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}},{"kind":"Field","name":{"kind":"Name","value":"error"}},{"kind":"Field","name":{"kind":"Name","value":"token"}}]}}]}}]} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>;