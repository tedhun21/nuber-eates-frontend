import { useMutation } from "@apollo/client";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useFieldArray, useForm } from "react-hook-form";
import { useHistory, useParams } from "react-router-dom";
import Button from "../../components/button";
import { graphql } from "../../gql";
import { CreateDishMutation, CreateDishMutationVariables } from "../../gql/graphql";
import { MY_RESTAURANT_QUERY } from "./my-restaurant";
import { OptionFields } from "./optionField/fieldArray";

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
type ChoiceValues = {
  name: string;
  extra: number;
};
type OptionValues = {
  name: string;
  extra?: number;
  choices?: ChoiceValues[];
};
interface IForm {
  name: string;
  price: string;
  description: string;
  options?: OptionValues[];
}

const defaultValues = {
  options: [
    {
      name: "",
      extra: 0,
      choices: [{ name: "", extra: 0 }],
    },
  ],
};

export const AddDish = () => {
  const { id: restaurantId } = useParams<IParams>();
  const history = useHistory();
  const {
    register,
    handleSubmit,
    control,
    getValues,
    reset,
    setValue,
    formState: { errors, isValid },
  } = useForm<IForm>({
    defaultValues: {
      options: [{ name: "", extra: 0 }],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "options",
  });
  const [createDishMutation, { data, loading, error }] = useMutation<CreateDishMutation, CreateDishMutationVariables>(CREATE_DISH_MUTATION, {
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
  const onSubmit = async ({ name, price, description, options }: IForm) => {
    await createDishMutation({
      variables: {
        createDishInput: {
          name,
          price: +price,
          description,
          restaurantId: +restaurantId,
          options,
        },
      },
    });
    if (data?.createDish.ok) {
      alert("Create Dish!!!");
      history.goBack();
    }
    console.log(name, price, description, options);
  };
  const [dishOption, setDishOption] = useState(false);
  const onDishOption = () => {
    setDishOption((current) => !current);
  };
  return (
    <div className="container mt-24 flex flex-col items-center">
      <Helmet>
        <title>Add Dish | Nuber Eats</title>
      </Helmet>
      <h4 className="mb-3 text-2xl font-bold">Add Dish</h4>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-5 mb-5 grid w-full max-w-screen-sm gap-3">
        <input {...register("name", { required: "Name is required." })} className="input" type="text" placeholder="Name" />
        <input {...register("price", { required: "Price is required." })} className="input" type="number" placeholder="Price" min={0} />
        <input {...register("description", { required: "Description is required." })} className="input" type="text" placeholder="Description" />
        <div className="my-10">
          <button className={`cursor-pointer text-lg font-medium ${dishOption ? "bg-gray-700 text-white" : ""}`} onClick={onDishOption} type="button">
            Dish Option
          </button>
          {dishOption && (
            <ul className="mt-5">
              <OptionFields {...{ control, register, defaultValues, getValues, setValue, errors }} />
              <button className="mt-10" type="button" onClick={() => reset(defaultValues)}>
                Options Reset
              </button>
            </ul>
          )}
        </div>
        <Button loading={loading} canClick={isValid} actionText="Create Dish" type="submit" />
      </form>
    </div>
  );
};
