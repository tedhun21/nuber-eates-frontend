import { useApolloClient, useMutation } from "@apollo/client";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import Button from "../../components/button";
import FormError from "../../components/form-error";
import { graphql } from "../../gql";
import { CreateRestaurantMutation, CreateRestaurantMutationVariables } from "../../gql/graphql";
import { MY_RESTAURANTS_QUERY } from "./my-restaurants";

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
  file: FileList;
}

export const AddRestaurant = () => {
  const client = useApolloClient();
  const history = useHistory();
  const [imageUrl, setImageUrl] = useState("");
  const onCompleted = (data: CreateRestaurantMutation) => {
    const {
      createRestaurant: { ok, restaurantId },
    } = data;
    if (ok) {
      const { name, categoryName, address } = getValues();
      setUploading(false);
      const queryResult = client.readQuery({ query: MY_RESTAURANTS_QUERY });
      console.log(queryResult?.myRestaurants.restaurants);
      const myNewRestaurant = {
        address,
        category: { __typename: "Category", name: categoryName },
        coverImg: imageUrl,
        id: restaurantId,
        isPromoted: false,
        name,
        __typename: "Restaurant",
      };
      client.writeQuery({
        query: MY_RESTAURANTS_QUERY,
        data: {
          myRestaurants: {
            ...queryResult!.myRestaurants,
            restaurants: [myNewRestaurant, ...queryResult!.myRestaurants.restaurants!],
          },
        },
      });
      history.push("/");
    }
  };
  const [createRestaurantMutation, { data }] = useMutation<CreateRestaurantMutation, CreateRestaurantMutationVariables>(CREATE_RESTAURANT_MUTAION, {
    onCompleted,
  });
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isValid },
  } = useForm<IFormProp>();
  const [uploading, setUploading] = useState(false);
  const onSubmit = async ({ name, categoryName, address, file }: IFormProp) => {
    try {
      setUploading(true);
      const actualFile = file[0];
      const formBody = new FormData();
      formBody.append("file", actualFile);
      const { url: coverImg } = await (
        await fetch("http://localhost:4000/uploads/", {
          method: "POST",
          body: formBody,
        })
      ).json();
      setImageUrl(coverImg);
      createRestaurantMutation({
        variables: {
          createRestaurantInput: {
            name,
            categoryName,
            address,
            coverImg,
          },
        },
      });
      setUploading(false);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="container mt-52 flex flex-col items-center">
      <Helmet>
        <title>Add Restaurant | Nuber Eats</title>
      </Helmet>
      <h4 className="mb-3 text-2xl font-semibold">add restaurants</h4>
      <form className="mt-5 mb-5 grid w-full max-w-screen-sm gap-3" onSubmit={handleSubmit(onSubmit)}>
        <input {...register("name", { required: "Name is required." })} type="text" placeholder="Name" />
        <input {...register("categoryName", { required: "Category Name is required." })} type="text" placeholder="Category Name" />
        <input {...register("address", { required: "Address is required." })} type="text" placeholder="Address" />
        <input {...register("file", { required: "Cover Image is required." })} type="file" placeholder="Cover Image" accept="image/*" />
        <Button loading={uploading} canClick={isValid} actionText="Create Restaurant" />
        {data?.createRestaurant.error && <FormError errorMessage={data.createRestaurant.error} />}
      </form>
    </div>
  );
};
