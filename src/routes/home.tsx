import { Navigate } from "react-router-dom";
import Header from "../components/header";
import { useMe } from "../hooks/useMe";
import Restaurants from "./client/restaurants";

export default function Home() {
  const { data, loading, error } = useMe();
  if (!data || loading || error) {
    return (
      <div className="flex h-screen items-center justify-center">
        <span className="text-xl font-medium tracking-wide">Loading...</span>
      </div>
    );
  }
  return (
    <div>
      <Header />
      <div>{data.me.role === "Client" ? <Restaurants /> : <Navigate to="/" />}</div>
    </div>
  );
}
