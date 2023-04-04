import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import Header from "../components/header";
import { MyRestaurant } from "../pages/owner/my-restaurant";
import { useMe } from "../hooks/useMe";
import { Category } from "../pages/client/category";
import { RestaurantDetail } from "../pages/client/restaurantDetail";
import { Restaurants } from "../pages/client/restaurants";
import { Search } from "../pages/client/search";
import { AddRestaurant } from "../pages/owner/add-restaurants";
import { MyRestaurants } from "../pages/owner/my-restaurants";
import { ConfirmEmail } from "../pages/user/confirm-email";
import { EditProfile } from "../pages/user/edit-profile";
import { AddDish } from "../pages/owner/add-dish";
import { TestPage } from "../pages/owner/test-page";
import { Order } from "../pages/order";

const clientRoutes = [
  {
    path: "/",
    component: <Restaurants />,
  },
  {
    path: "/search",
    component: <Search />,
  },
  {
    path: "/category/:slug",
    component: <Category />,
  },
  {
    path: "/restaurant/:id",
    component: <RestaurantDetail />,
  },
];

const commonRoutes = [
  {
    path: "/confirm",
    component: <ConfirmEmail />,
  },
  {
    path: "/edit-profile",
    component: <EditProfile />,
  },
  {
    path:"/orders/:id",
    component:<Order />
  }
];

const restaurantRoutes = [
  {
    path: "/",
    component: <MyRestaurants />,
  },
  {
    path: "/add-restaurant",
    component: <AddRestaurant />,
  },
  {
    path: "/restaurant/:id",
    component: <MyRestaurant />,
  },
  {
    path: "/restaurant/:id/add-dish",
    component: <AddDish />,
  },
  {
    path: "/test",
    component: <TestPage />,
  },
];

export const LoggedInRouter = () => {
  const { data, loading, error } = useMe();
  if (!data || loading || error) {
    return (
      <div className="flex h-screen items-center justify-center">
        <span className="text-xl font-medium tracking-wide">Loading...</span>
      </div>
    );
  }
  return (
    <Router>
      <Header />
      <Switch>
        {data?.me.role === "Client" &&
          clientRoutes.map((route) => (
            <Route exact key={route.path} path={route.path}>
              {route.component}
            </Route>
          ))}
        {data?.me.role === "Owner" &&
          restaurantRoutes.map((route) => (
            <Route exact key={route.path} path={route.path}>
              {route.component}
            </Route>
          ))}
        {commonRoutes.map((route) => (
          <Route exact key={route.path} path={route.path}>
            {route.component}
          </Route>
        ))}
        <Redirect to="/" />
      </Switch>
    </Router>
  );
};
