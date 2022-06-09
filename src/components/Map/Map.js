import React from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";
import "./map.css";
import marker from "../../images/map_marker.png";

export default function Map(props) {
  const center = {
    lat: 45.32157715818895,
    lng: 25.37871559993049,
  };

  const MapMarker = () => (
    <>
      <img className="marker-icon" src={marker} alt="home icon" />
    </>
  );
  return (
    <LoadScript googleMapsApiKey="AIzaSyDTxJxatC7NCbjefGvV-Se6eE-whnJ6b-M">
      <GoogleMap center={center} mapContainerClassName="MapContainer" zoom={10}>
        <MapMarker lat={45.32157715818895} lng={25.37871559993049} />
      </GoogleMap>
    </LoadScript>
  );
}
