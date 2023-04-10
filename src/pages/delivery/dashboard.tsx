import GoogleMapReact from "google-map-react";
import { useEffect, useState } from "react";

interface ICoords {
  lat: number;
  lng: number;
}

export const Dashboard = () => {
  const [driverCoords, setDriverCoords] = useState<ICoords>({ lat: 0, lng: 0 });
  console.log(driverCoords);
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
  const handleApiLoaded = (map: any, maps: any) => {
    console.log(map)
    map.panTo(new maps.LatLng(driverCoords.lat, driverCoords.lng));
  };
  return (
    <div>
      <div className="overflow-hidden" style={{ width: window.innerWidth, height: "95vh" }}>
        <GoogleMapReact
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
          defaultZoom={15}
          draggable={false}
          defaultCenter={{
            lat: 36.58,
            lng: 125.95,
          }}
          bootstrapURLKeys={{ key: "AIzaSyAB93SRYZYuC2R6lcxN_FA5hah14l9p8FI" }}
        ></GoogleMapReact>
      </div>
    </div>
  );
};
