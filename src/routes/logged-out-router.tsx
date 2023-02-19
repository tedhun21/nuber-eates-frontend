import { isLoggedInVar } from "../apollo";

export default function LoggedOutRouter() {
  const onClick = () => {
    isLoggedInVar(true);
  };
  return (
    <div>
      <h1>Logged Out</h1>
      <button onClick={onClick}>Click to login</button>
    </div>
  );
}
