import { ReactNode } from "react";
import { DishOption } from "../gql/graphql";

interface IDishProps {
  id?: number;
  description: string;
  name: string;
  price: number;
  isCustomer?: boolean;
  orderStarted?: boolean;
  isSelected?: boolean;
  options?: DishOption[] | null;
  addItemToOrder?: (dishId: number) => void;
  removeFromOrder?: (dishId: number) => void;
  children?: React.ReactNode;
}

export const Dish = ({
  id = 0,
  name,
  price,
  description,
  isCustomer = false,
  options,
  orderStarted = false,
  addItemToOrder,
  isSelected,
  removeFromOrder,
  children: dishOptions,
}: IDishProps) => {
  const onClick = () => {
    if (orderStarted) {
      if (!isSelected && addItemToOrder) {
        return addItemToOrder(id);
      }
      if (isSelected && removeFromOrder) {
        return removeFromOrder(id);
      }
    }
  };
  return (
    <div className={`border px-8 py-4 transition-all ${isSelected ? "border-gray-800 " : "hover:border-gray-800"}`}>
      <div className="mb-5">
        <h3 className="text-lg font-medium">
          {name} {orderStarted && <button onClick={onClick}>{isSelected ? "Remove" : "Add"}</button>}
        </h3>
        <h4 className="font-medium">{description}</h4>
      </div>
      <span>${price}</span>
      {isCustomer && options && options?.length !== 0 && (
        <div>
          <h5 className="mt-5 mb-3 font-medium">Dish Options:</h5>
          {dishOptions}
        </div>
      )}
    </div>
  );
};
