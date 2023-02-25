import { createBrowserRouter } from "react-router-dom";
import Login from "./routes/login";
import Root from "./components/Root";
import CreateAccount from "./routes/create-account";
import Home from "./routes/home";
import NotFound from "./routes/404";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <NotFound />,
    children: [
      {
        path: "home",
        element: <Home />,
      },
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
