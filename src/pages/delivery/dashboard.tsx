import GoogleMapReact from "google-map-react";

export const Dashboard = () => {
  return (
    <div>
      <div className="overflow-hidden" style={{ width: window.innerWidth, height: "95vh" }}>
        <GoogleMapReact
          defaultZoom={20}
          defaultCenter={{
            lat: 10.99835602,
            lng: 77.01502627,
          }}
          bootstrapURLKeys={{ key: "AIzaSyAB93SRYZYuC2R6lcxN_FA5hah14l9p8FI" }}
        >
          <h1>hello</h1>
        </GoogleMapReact>
      </div>
    </div>
  );
};
