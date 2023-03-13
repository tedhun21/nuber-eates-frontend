import { useMutation } from "@apollo/client";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import Button from "../../components/button";
import { graphql } from "../../gql";
import { CreateRestaurantMutation, CreateRestaurantMutationVariables } from "../../gql/graphql";

const CREATE_RESTAURANT_MUTAION = graphql(`
  mutation CreateRestaurant($createRestaurantInput: CreateRestaurantInput!) {
    createRestaurant(input: $createRestaurantInput) {
      ok
      error
      restaurantId
    }
  }
`);

interface IFormProp {
  name: string;
  categoryName: string;
  address: string;
  coverImg: string;
}

export const AddRestaurant = () => {
  const [createRestaurantMutation, { loading, data }] = useMutation<CreateRestaurantMutation, CreateRestaurantMutationVariables>(CREATE_RESTAURANT_MUTAION);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<IFormProp>();
  const onSubmit = (data: IFormProp) => {
    console.log(data);
  };
  return (
    <div className="container">
      <Helmet>
        <title>Add Restaurant | Nuber Eats</title>
      </Helmet>
      <h1>add restaurants</h1>
      <form className="jusrify-center flex flex-col items-center" onSubmit={handleSubmit(onSubmit)}>
        <input {...register("name", { required: "Name is required." })} type="text" placeholder="Name" />
        <input {...register("categoryName", { required: "Category Name is required." })} type="text" placeholder="Category Name" />
        <input {...register("address", { required: "Address is required." })} type="text" placeholder="Address" />
        <input {...register("coverImg", { required: "Cover Image is required." })} type="text" placeholder="Cover Image" />
        <Button loading={loading} canClick={isValid} actionText="Create Restaurant" />
      </form>
    </div>
  );
};
