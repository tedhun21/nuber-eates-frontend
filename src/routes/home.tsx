import { useNavigate } from "react-router-dom";
import { authToken, isLoggedInVar } from "../apollo";
import { LOCALSTORAGE_TOKEN } from "../constants";

export default function Home() {
  const navigate = useNavigate();
  return <div>Home</div>;
}
