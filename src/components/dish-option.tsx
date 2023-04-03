interface IDishOptionProps {
  isSelected: boolean;
  name: string;
  extra?: number | null;
  dishId: number;
  addOptionToItem: (dishId: number, option: any) => void;
  removeOptionFromItem: (dishId: number, optionName: string) => void;
}

export const DishOption = ({ isSelected, name, extra, dishId, addOptionToItem, removeOptionFromItem }: IDishOptionProps) => {
  const onClick = () => {
    if (isSelected) {
      removeOptionFromItem(dishId, name);
    } else {
      addOptionToItem(dishId, name);
    }
  };
  return (
    <span onClick={onClick} className={`flex items-center border ${isSelected ? "border-gray-800" : ""}`}>
      <h6 className="mr-2">{name}</h6>
      {extra && <h6 className="text-sm opacity-75">(${extra})</h6>}
    </span>
  );
};
