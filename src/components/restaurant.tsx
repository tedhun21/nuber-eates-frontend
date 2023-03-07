interface IRestaurantProps {
  id: number;
  coverImg?: string | null;
  name: string;
  categoryName?: string;
}

export const Restaurant = ({ coverImg, name, categoryName }: IRestaurantProps) => {
  return (
    <div className="flex flex-col">
      <div style={{ backgroundImage: `url(${coverImg})` }} className="mb-3 bg-red-500 bg-cover bg-center py-28"></div>
      <h3 className="text-xl">{name}</h3>
      <span className="mt-3 border-t border-gray-400 py-2 text-xs opacity-50">{categoryName}</span>
    </div>
  );
};
