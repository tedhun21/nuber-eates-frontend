import { DishOption } from "../gql/graphql";

interface IDishProps {
  name: string;
  price: number;
  description: string;
  isCustomer?: boolean;
  options?: DishOption[] | null;
}

export const Dish = ({ name, price, description, isCustomer = false, options }: IDishProps) => {
  console.log(options);
  return (
    <div className="border px-8 py-4 transition-all hover:border-gray-800 ">
      <div className="mb-5">
        <h3 className="text-lg font-medium">{name}</h3>
        <h4 className="font-medium">{description}</h4>
      </div>
      <span>${price}</span>
      {isCustomer && options && options?.length !== 0 && (
        <div>
          <h5 className="mt-5 mb-3 font-medium">Dish Options:</h5>
          {options?.map((option, index) => (
            <span className="flex items-center" key={index}>
              <h6 className="mr-2">{option.name}</h6>
              <h6 className="text-sm opacity-75">(${option.extra})</h6>
            </span>
          ))}
        </div>
      )}
    </div>
  );
};
