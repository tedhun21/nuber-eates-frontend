import { useReactiveVar } from "@apollo/client";
import { isLoggedInVar } from "../apollo";
import LoggedInRouter from "../routes/logged-in-router";
import LoggedOutRouter from "../routes/logged-out-router";

export default function Root() {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  return <>{isLoggedIn ? <LoggedInRouter /> : <LoggedOutRouter />}</>;
}
