import { createBrowserRouter } from "react-router-dom";
import Login from "./routes/login";
import Root from "./components/Root";
import CreateAccount from "./routes/create-account";
import Home from "./routes/home";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "create-account",
        element: <CreateAccount />,
      },
    ],
  },
]);
