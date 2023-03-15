import { useMutation } from "@apollo/client";
import { useParams } from "react-router-dom";
import { graphql } from "../../gql";

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

export const AddDish = () => {
  const { id: restaurantId } = useParams<IParams>();
  const [createDishMutation, { loading }] = useMutation(CREATE_DISH_MUTATION);
  return <h1>add-dish</h1>;
};
