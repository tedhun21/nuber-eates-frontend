import { useQuery } from "@apollo/client";
import { Helmet } from "react-helmet-async";
import { Link, useParams } from "react-router-dom";
import { Dish } from "../../components/dish";
import { graphql } from "../../gql";
import { VictoryAxis, VictoryBar, VictoryChart } from "victory";

export const MY_RESTAURANT_QUERY = graphql(`
  query myRestaurant($myRestaurantInput: MyRestaurantInput!) {
    myRestaurant(input: $myRestaurantInput) {
      ok
      error
      restaurant {
        ...RestaurantParts
        menu {
          ...DishParts
        }
      }
    }
  }
`);

interface IParams {
  id: string;
}

export const MyRestaurant = () => {
  const { id } = useParams<IParams>();
  const { data } = useQuery(MY_RESTAURANT_QUERY, {
    variables: {
      myRestaurantInput: {
        id: +id,
      },
    },
  });
  console.log(data);

  return (
    <div>
      <Helmet>
        <title>{data?.myRestaurant.restaurant?.name || "Loading..."}</title>
      </Helmet>
      <div className="bg-gray-700 bg-cover bg-center py-28" style={{ backgroundImage: `url(${data?.myRestaurant.restaurant?.coverImg})` }}></div>
      <div className="container mt-10">
        <h2 className="mb-10 text-4xl font-medium">{data?.myRestaurant.restaurant?.name || "Loading..."}</h2>
        <div>
          <Link to={`/restaurant/${id}/add-dish`} className="mr-8 bg-gray-800 py-2 px-10 text-white">
            Add Dish &rarr;
          </Link>
          <Link to={``} className="bg-lime-700 py-2 px-8 text-white">
            Buy Promotion &rarr;
          </Link>
        </div>
        <div className="mt-10">
          {data?.myRestaurant.restaurant?.menu.length === 0 ? (
            <h4>Please upload a dish!</h4>
          ) : (
            <div className="mt-16 grid gap-x-5 gap-y-10 md:grid-cols-3">
              {data?.myRestaurant.restaurant?.menu.map((dish) => (
                <Dish key={dish.id} name={dish.name} price={dish.price} description={dish.description} />
              ))}
            </div>
          )}
        </div>
        <div className="mt-20 mb-10">
          <h4 className="text-center text-2xl font-medium">Sales</h4>
          <div className="mx-auto w-full max-w-lg">
            <VictoryChart domainPadding={20}>
              <VictoryAxis
                animate={{
                  duration: 2000,
                  easing: "bounce",
                }}
                dependentAxis
                label="Amount of Money"
                tickValues={[20, 30, 40, 50, 60]}
              />
              <VictoryAxis label="Days of Life" />
              <VictoryBar
                data={[
                  { x: 10, y: 20 },
                  { x: 20, y: 5 },
                  { x: 35, y: 55 },
                  { x: 45, y: 99 },
                ]}
              />
            </VictoryChart>
          </div>
        </div>
      </div>
    </div>
  );
};
