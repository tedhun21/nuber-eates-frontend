interface IDishProps {
  name: string;
  price: number;
  description: string;
}

export const Dish = ({ name, price, description }: IDishProps) => {
  return (
    <div className="border px-8 py-4 transition-all hover:border-gray-800 ">
      <div className="mb-5">
        <h3 className="text-lg font-medium">{name}</h3>
        <h4 className="font-medium">{description}</h4>
      </div>
      <span>${price}</span>
    </div>
  );
};
