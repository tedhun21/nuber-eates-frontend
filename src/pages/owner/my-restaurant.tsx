import { useMutation, useQuery, useSubscription } from "@apollo/client";
import { Helmet } from "react-helmet-async";
import { Link, useHistory, useParams } from "react-router-dom";
import { Dish } from "../../components/dish";
import { graphql } from "../../gql";
import { VictoryAxis, VictoryChart, VictoryLabel, VictoryLine, VictoryTheme, VictoryTooltip, VictoryVoronoiContainer } from "victory";
import { useMe } from "../../hooks/useMe";
import { CreatePaymentMutation, CreatePaymentMutationVariables } from "../../gql/graphql";
import { useEffect } from "react";

export const MY_RESTAURANT_QUERY = graphql(`
  query MyRestaurant($myRestaurantInput: MyRestaurantInput!) {
    myRestaurant(input: $myRestaurantInput) {
      ok
      error
      restaurant {
        ...RestaurantParts
        menu {
          ...DishParts
        }
        orders {
          ...OrderParts
        }
      }
    }
  }
`);

const CREATE_PAYMENT_MUTATION = graphql(`
  mutation CreatePayment($createPaymentInput: CreatePaymentInput!) {
    createPayment(input: $createPaymentInput) {
      ok
      error
    }
  }
`);

const PENDING_ORDERS_SUBSCRIPTION = graphql(`
  subscription PendingOrders {
    pendingOrders {
      ...FullOrderParts
    }
  }
`);

interface IParams {
  id: string;
}

export const MyRestaurant = () => {
  const { id } = useParams<IParams>();
  const { data: userData } = useMe();
  const { data } = useQuery(MY_RESTAURANT_QUERY, {
    variables: {
      myRestaurantInput: {
        id: +id,
      },
    },
  });
  const onCompleted = (data: CreatePaymentMutation) => {
    if (data.createPayment.ok) {
      alert("Your restaurant is beingpromoted!");
    }
  };
  const [createPaymentMutation, { loading }] = useMutation<CreatePaymentMutation, CreatePaymentMutationVariables>(CREATE_PAYMENT_MUTATION, { onCompleted });
  const triggerPaddle = () => {
    if (userData?.me.email) {
      // @ts-ignores
      window.Paddle.Setup({ vendor: 168303 });
      // @ts-ignores
      window.Paddle.Checkout.open({
        product: 821271,
        email: userData.me.email,
        successCallback: (data: any) => {
          createPaymentMutation({ variables: { createPaymentInput: { transactionId: data.checkout.id, restaurantId: +id } } });
        },
      });
    }
  };
  const { data: subscriptionData } = useSubscription(PENDING_ORDERS_SUBSCRIPTION);
  const history = useHistory();
  useEffect(() => {
    if (subscriptionData?.pendingOrders.id) {
      history.push(`/orders/${subscriptionData.pendingOrders.id}`);
    }
  }, [subscriptionData]);
  console.log(subscriptionData);

  return (
    <div>
      <Helmet>
        <title>{data?.myRestaurant.restaurant?.name || "Loading..."} | Nuber Eats</title>
        <script src="https://cdn.paddle.com/paddle/paddle.js"></script>
      </Helmet>
      <div className="checkout-container"></div>
      <div
        className="bg-gray-700 bg-cover bg-center py-28"
        style={{
          backgroundImage: `url(${data?.myRestaurant.restaurant?.coverImg})`,
        }}
      ></div>
      <div className="container mt-10">
        <h2 className="mb-10 text-4xl font-medium">{data?.myRestaurant.restaurant?.name || "Loading..."}</h2>
        <Link to={`/restaurant/${id}/add-dish`} className=" mr-8 bg-gray-800 py-3 px-10 text-white">
          Add Dish &rarr;
        </Link>
        <span onClick={triggerPaddle} className=" cursor-pointer bg-lime-700 py-3 px-10 text-white">
          Buy Promotion &rarr;
        </span>
        <div className="mt-10">
          {data?.myRestaurant.restaurant?.menu.length === 0 ? (
            <h4 className="mb-5 text-xl">Please upload a dish!</h4>
          ) : (
            <div className="mt-16 grid gap-x-5 gap-y-10 md:grid-cols-3">
              {data?.myRestaurant.restaurant?.menu.map((dish, index) => (
                <Dish key={index} name={dish.name} description={dish.description} price={dish.price} />
              ))}
            </div>
          )}
        </div>
        <div className="mt-20 mb-10">
          <h4 className="text-center text-2xl font-medium">Sales</h4>
          <div className="  mt-10">
            <VictoryChart
              height={500}
              theme={VictoryTheme.material}
              width={window.innerWidth}
              domainPadding={50}
              containerComponent={<VictoryVoronoiContainer />}
            >
              <VictoryLine
                labels={({ datum }) => `$${datum.y}`}
                labelComponent={<VictoryTooltip style={{ fontSize: 18 } as any} renderInPortal dy={-20} />}
                data={data?.myRestaurant.restaurant?.orders.map((order) => ({
                  x: order.createdAt,
                  y: order.total,
                }))}
                interpolation="natural"
                style={{
                  data: {
                    strokeWidth: 5,
                  },
                }}
              />
              <VictoryAxis
                tickLabelComponent={<VictoryLabel renderInPortal />}
                style={{
                  tickLabels: {
                    fontSize: 20,
                  } as any,
                }}
                tickFormat={(tick) => new Date(tick).toLocaleDateString("ko")}
              />
            </VictoryChart>
          </div>
        </div>
      </div>
    </div>
  );
};
