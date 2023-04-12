import GoogleMapReact from "google-map-react";
import { useEffect, useState } from "react";

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
  const onGetRouteClick = () => {
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
      <button onClick={onGetRouteClick}>Get Route</button>
    </div>
  );
};
