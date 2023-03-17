interface IButtonProps {
  canClick: boolean;
  loading: boolean;
  actionText: string;
  type?: "submit" | "button" | "reset";
}

export default function Button({ canClick, loading, actionText, type }: IButtonProps) {
  return (
    <button
      className={`py-4 text-center text-lg font-medium text-white transition-colors focus:outline-none ${
        canClick ? "bg-lime-600 hover:bg-lime-700 " : "pointer-events-none bg-gray-300"
      }`}
      type={type}
    >
      {loading ? "Loading..." : actionText}
    </button>
  );
}
