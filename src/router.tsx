import { createBrowserRouter } from "react-router-dom";
import Root from "./components/Root";
import LoggedInRouter from "./routes/logged-in-router";
import LoggedOutRouter from "./routes/logged-out-router";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "",
        element: <LoggedOutRouter />,
      },
      {
        path: "loggedIn",
        element: <LoggedInRouter />,
      },
    ],
  },
]);
