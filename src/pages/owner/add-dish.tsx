import { useMutation } from "@apollo/client";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useFieldArray, useForm } from "react-hook-form";
import { useHistory, useParams } from "react-router-dom";
import Button from "../../components/button";
import { graphql } from "../../gql";
import { CreateDishMutation, CreateDishMutationVariables } from "../../gql/graphql";
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

type OptionValues = {
  name: string;
  extra?: number;
};
interface IForm {
  name: string;
  price: string;
  description: string;
  options?: OptionValues[];
}

export const AddDish = () => {
  const { id: restaurantId } = useParams<IParams>();
  const history = useHistory();
  const {
    register,
    handleSubmit,
    control,
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
          <div className="flex">
            <button className="text-lg font-medium" onClick={onDishOption} type="button">
              Dish Option
            </button>
            {dishOption && (
              <button
                className="cursor-pointer bg-gray-700 px-2 py-1 text-white"
                onClick={() => {
                  append({ name: "", extra: 0 });
                }}
                type="button"
              >
                Add Dish Option +
              </button>
            )}
          </div>
          {dishOption && (
            <ul className="mt-5">
              {fields.map((item, index) => (
                <li key={item.id} className="mx-4 mb-3 flex justify-between">
                  <div>
                    <input
                      className="mr-3 w-36 border-2 py-2 px-3 focus:border-gray-600 focus:outline-none"
                      {...register(`options.${index}.name`)}
                      placeholder="Option Name"
                    />
                    <input
                      className="w-36 border-2 px-3 py-2 focus:border-gray-600 focus:outline-none"
                      {...register(`options.${index}.extra`, { valueAsNumber: true })}
                      placeholder="Option Extra"
                      type="number"
                      min={0}
                    />
                  </div>
                  <div className="flex items-center justify-center">
                    <button className="cursor-pointer bg-red-700 px-2 py-1 text-white" type="button" onClick={() => remove(index)}>
                      Delete Option
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
        <Button loading={loading} canClick={isValid} actionText="Create Dish" type="submit" />
      </form>
    </div>
  );
};
