import GoogleMapReact from "google-map-react";
import { useEffect, useState } from "react";
import { graphql } from "../../gql";
import { useSubscription } from "@apollo/client";
import { CookedOrdersSubscription, CookedOrdersSubscriptionVariables } from "../../gql/graphql";
import { Link } from "react-router-dom";

const COOKED_ORDERS_SUBSCRIPTION = graphql(`
  subscription CookedOrders {
    cookedOrders {
      ...FullOrderParts
    }
  }
`);

interface ICoords {
  lat: number;
  lng: number;
}

interface IDriverProps {
  lat: number;
  lng: number;
  $hover?: any;
}

const Driver: React.FC<IDriverProps> = () => <div className="text-lg">🚖</div>;

export const Dashboard = () => {
  const [driverCoords, setDriverCoords] = useState<ICoords>({ lat: 0, lng: 0 });
  const [map, setMap] = useState<google.maps.Map>();
  const [maps, setMaps] = useState<any>();
  const onSuccess = ({ coords: { latitude, longitude } }: GeolocationPosition) => {
    setDriverCoords({ lat: latitude, lng: longitude });
  };
  const onError = (error: GeolocationPositionError) => {
    console.log(error);
  };
  useEffect(() => {
    navigator.geolocation.watchPosition(onSuccess, onError, {
      enableHighAccuracy: true,
    });
  }, []);
  useEffect(() => {
    if (map && maps) {
      map.panTo(new google.maps.LatLng(driverCoords.lat, driverCoords.lng));
      /* const geocoder = new google.maps.Geocoder();
      geocoder.geocode({ location: new google.maps.LatLng(driverCoords.lat, driverCoords.lng) }).then((results) => console.log(results)); */
    }
  }, [driverCoords.lat, driverCoords.lng]);
  const handleApiLoaded = (map: any, maps: any) => {
    map.panTo(new google.maps.LatLng(driverCoords.lat, driverCoords.lng));
    setMap(map);
    setMaps(maps);
  };
  const makeRoute = () => {
    if (map) {
      const directionsService = new google.maps.DirectionsService();
      const directionsRenderer = new google.maps.DirectionsRenderer();
      directionsRenderer.setMap(map);
      directionsService.route(
        {
          origin: new google.maps.LatLng(driverCoords.lat, driverCoords.lng),
          destination: new google.maps.LatLng(driverCoords.lat + 0.05, driverCoords.lng + 0.05),
          travelMode: google.maps.TravelMode.TRANSIT,
        },
        (result, status) => {
          if (status === "OK") {
            directionsRenderer.setDirections(result);
          }
        }
      );
    }
  };
  const { data: cookedOrdersData } = useSubscription<CookedOrdersSubscription, CookedOrdersSubscriptionVariables>(COOKED_ORDERS_SUBSCRIPTION);
  useEffect(() => {
    if (cookedOrdersData?.cookedOrders.id) {
      makeRoute();
    }
  }, []);
  return (
    <div>
      <div className="overflow-hidden" style={{ width: window.innerWidth, height: "50vh" }}>
        <GoogleMapReact
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
          defaultZoom={16}
          draggable={true}
          defaultCenter={{
            lat: 36.58,
            lng: 125.95,
          }}
          bootstrapURLKeys={{ key: "AIzaSyAB93SRYZYuC2R6lcxN_FA5hah14l9p8FI" }}
        ></GoogleMapReact>
      </div>
      <div className=" relative -top-10 mx-auto max-w-screen-sm bg-white py-8 px-5 shadow-lg">
        {cookedOrdersData?.cookedOrders.restaurant ? (
          <>
            <h1 className="text-center  text-3xl font-medium">New Coocked Order</h1>
            <h1 className="my-3 text-center text-2xl font-medium">Pick it up soon @ {cookedOrdersData?.cookedOrders.restaurant?.name}</h1>
            <Link to={`/orders/${cookedOrdersData?.cookedOrders.id}`} className="btn mt-5 block w-full text-center">
              Accept Challenge &rarr;
            </Link>
          </>
        ) : (
          <h1 className="text-center  text-3xl font-medium">No orders yet...</h1>
        )}
      </div>
    </div>
  );
};
