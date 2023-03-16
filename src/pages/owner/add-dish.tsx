import { useMutation } from "@apollo/client";
import { useState } from "react";
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
  [key: string]: string;
}

export const AddDish = () => {
  const { id: restaurantId } = useParams<IParams>();
  const history = useHistory();
  const {
    register,
    handleSubmit,
    setValue,
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
  const onSubmit = ({ name, price, description, ...rest }: IForm) => {
    console.log(rest);
    /* createDishMutation({
      variables: {
        createDishInput: {
          name,
          price: +price,
          description,
          restaurantId: +restaurantId,
        },
      },
    });
    history.goBack(); */
  };
  const [optionsNumber, setOptionsNumber] = useState(0);
  const onAddOptionClick = () => {
    setOptionsNumber((current) => current + 1);
  };
  const onDeleteClick = (idToDelete: number) => {
    setOptionsNumber((current) => current - 1);
    setValue(`${idToDelete}-optionName`, "");
    setValue(`${idToDelete}-optionExtra`, "");
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
        <div className="my-10">
          <h4 className="mb-3 text-lg font-medium">Dish Option</h4>
          <span onClick={onAddOptionClick} className="cursor-pointer bg-gray-900 py-1 px-2 text-white">
            Add Dish Option
          </span>
          {optionsNumber !== 0 &&
            Array.from(new Array(optionsNumber)).map((_, index) => (
              <div key={index} className="mt-5">
                <input
                  {...register(`${index}-optionName`)}
                  className="mr-3 border-2 py-2 px-4 focus:border-gray-600 focus:outline-none"
                  type="text"
                  placeholder="Option Name"
                />
                <input
                  {...register(`${index}-optionPrice`)}
                  className="border-2 py-2 px-4 focus:border-gray-600 focus:outline-none"
                  type="number"
                  min={0}
                  placeholder="Option Extra Price"
                />
                <span onClick={() => onDeleteClick(index)}>Delete Option</span>
              </div>
            ))}
        </div>
        <Button loading={loading} canClick={isValid} actionText="Create Dish" />
      </form>
    </div>
  );
};
