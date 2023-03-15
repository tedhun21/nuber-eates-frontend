import { useMutation } from "@apollo/client";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { useHistory, useParams } from "react-router-dom";
import Button from "../../components/button";
import { graphql } from "../../gql";
import { MY_RESTAURANT_QUERY } from "./my-restaurant";

const CREATE_DISH_MUTATION = graphql(`
  mutation CreateDish($createDishInput: CreateDishInput!) {
    createDish(input: $createDishInput) {
      ok
      error
    }
  }
`);

interface IParams {
  id: string;
}

interface IForm {
  name: string;
  price: string;
  description: string;
}

export const AddDish = () => {
  const { id: restaurantId } = useParams<IParams>();
  const history = useHistory();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<IForm>();
  const [createDishMutation, { loading }] = useMutation(CREATE_DISH_MUTATION, {
    refetchQueries: [
      {
        query: MY_RESTAURANT_QUERY,
        variables: {
          myRestaurantInput: {
            id: +restaurantId,
          },
        },
      },
    ],
  });
  const onSubmit = ({ name, price, description }: IForm) => {
    createDishMutation({
      variables: {
        createDishInput: {
          name,
          price: +price,
          description,
          restaurantId: +restaurantId,
        },
      },
    });
    history.goBack();
  };
  return (
    <div className="container mt-52 flex flex-col items-center">
      <Helmet>
        <title>Add Dish | Nuber Eats</title>
      </Helmet>
      <h4 className="mb-3 text-2xl font-semibold">Add Dish</h4>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-5 mb-5 grid w-full max-w-screen-sm gap-3">
        <input {...register("name", { required: "Name is required." })} className="input" type="text" placeholder="Name" />
        <input {...register("price", { required: "Price is required." })} className="input" type="number" placeholder="Price" min={0} />
        <input {...register("description", { required: "Description is required." })} className="input" type="text" placeholder="Description" />
        <Button loading={loading} canClick={isValid} actionText="Create Dish" />
      </form>
    </div>
  );
};
