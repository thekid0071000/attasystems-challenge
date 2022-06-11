import React, { useEffect, useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import "./map.css";
import { nanoid } from "nanoid";
import PopUp from "../Popup/PopUp";
import callApi from "../../utils/methods";

export default function Map(props) {
  // Create a state variable that will track whether the marker has been clicked or not.
  const [clickedMarker, setClickedMarker] = useState(false);

  // Create a state variable that will store information about the location of the marker that has been clicked.
  const [locationInfo, setLocationInfo] = useState({});

  // Create a state variable that will store all the favorite locations from the API.
  const [favoriteLocations, setFavoriteLocations] = useState([]);

  // Default coordinates for the center of the map.
  const center = {
    lat: 44.389122,
    lng: 26.115875,
  };

  // Get all the favorite locations from the API on the first render.
  useEffect(() => {
    async function getLocations() {
      const faves = await callApi("favourites", "GET");
      const favesBody = await faves.json();
      setFavoriteLocations(favesBody);
    }

    getLocations();
  }, []);

  // Map through all the locations that were passed as props to the Map component.
  const allLocations = props.locations.map((location) => {
    // Check if each location has already been added to Favorites.
    const index = favoriteLocations.findIndex(
      (object) => object.name === location.name
    );

    // If the location is not a Favorite, return a Marker with a red color.
    if (index === -1) {
      return (
        <Marker
          key={nanoid()}
          position={{
            lat: parseFloat(location.lat),
            lng: parseFloat(location.long),
          }}
          onClick={() => {
            onMarkerClick(location);
          }}
          icon={"http://maps.google.com/mapfiles/ms/icons/red-dot.png"}
        />
      );
      // If the location is already a favorite, return a Marker with a yellow color.
    } else {
      return (
        <Marker
          key={nanoid()}
          position={{
            lat: parseFloat(location.lat),
            lng: parseFloat(location.long),
          }}
          onClick={() => {
            onMarkerClick(location);
          }}
          icon={"http://maps.google.com/mapfiles/ms/icons/yellow-dot.png"}
        />
      );
    }
  });

  // onClick function for the Marker. Set the clickedMarker state to "true" and set the locationInfo state to the current clicked location.
  function onMarkerClick(location) {
    setClickedMarker(true);
    setLocationInfo(location);
  }

  // This function triggers when the pop up page has been closed. Updates the Favorite locations.
  async function onInfoWindowClose() {
    const faves = await callApi("favourites", "GET");
    const favesBody = await faves.json();
    setFavoriteLocations(favesBody);
    console.log("Closed!");
    // Set the clickedMarker state to "false".
    setClickedMarker(false);
  }
  // Render a Google Map and display all the locations on it.
  // Conditionally render a PopUp page when the clickedMarker state is set to "true".
  // Note: this is not a good solution to pass the Google Maps API Key but it will work for the purpose of this project.
  return (
    <LoadScript googleMapsApiKey="AIzaSyDTxJxatC7NCbjefGvV-Se6eE-whnJ6b-M">
      <GoogleMap center={center} mapContainerClassName="MapContainer" zoom={3}>
        {clickedMarker ? (
          <PopUp location={locationInfo} closed={onInfoWindowClose} />
        ) : null}
        {allLocations}
      </GoogleMap>
    </LoadScript>
  );
}
