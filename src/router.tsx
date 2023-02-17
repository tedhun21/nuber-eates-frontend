import { createBrowserRouter } from "react-router-dom";
import LoggedInRouter from "./routes/logged-in-router";
import LoggedOutRouter from "./routes/logged-out-router";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LoggedOutRouter />,
  },
  {
    path: "/loggedIn",
    element: <LoggedInRouter />,
  },
]);
