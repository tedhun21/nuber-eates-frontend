import { createBrowserRouter } from "react-router-dom";
import Login from "./routes/login";
import Root from "./components/Root";
import { CreateAccount } from "./routes/create-account";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "",
        element: <Login />,
      },
      {
        path: "create-account",
        element: <CreateAccount />,
      },
    ],
  },
]);
