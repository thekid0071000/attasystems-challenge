import React, { useState, useEffect } from "react";
import "./popup.css";
import { InfoWindow } from "@react-google-maps/api";
import callApi from "../../utils/methods";
import starOn from "../../images/star-on.png";
import starOff from "../../images/star-off.png";

export default function PopUp(props) {
  // Create a state variable that will indicate whether each location is a Favorite or not. Default it to "false".
  // This will help conditionally render the pop up page, displaying whether the location is already a favorite or not.
  const [isFavorite, setIsFavorite] = useState(false);
  // Create a variable that will store the id of the item that will be Deleted from Favorites.
  let id;
  // Get all the favorite locations and check if the opened location is one of them. If yes, set the state to "true". This will display all the favorite items
  // that have been previously added to Favorites on the page's first render.
  useEffect(() => {
    async function checkFavorites() {
      const res = await callApi("favourites", "GET");
      const body = await res.json();
      const itemsInFavorites = body.filter((item) => {
        if (item.name === props.location.name) {
          setIsFavorite(true);
          return item;
        }
      });
    }
    checkFavorites();
  }, []);

  // Add location to Favorites and set the state to "true".
  async function addToFavorites() {
    const res = await callApi("favourites", "POST", props.location);
    setIsFavorite(true);
  }

  // Remove location from Favorites.
  async function removeFromFavorites() {
    // Get all the favorite locations.
    const res = await callApi("favourites", "GET");
    const body = await res.json();
    // Map through all the locations until the the one currently opened is found.
    const itemToDelete = body.map((item) => {
      if (item.name === props.location.name) {
        // Math by name
        // (this is because the API sets a new id for the favorite locations, different from the "spots" endpoint)
        // (Because these are locations that all have different names, it will work for the purpose of the project.)

        // Store the id of the location to be deleted.
        id = item.id;
        return item;
      }
    });

    // Delete item using the id stored above.
    const deleteItem = await callApi(`favourites/${id}`, "DELETE");

    // Set the state to "false".
    setIsFavorite(false);
  }

  // Return a <InfoWindow /> component that will display all the information as a pop up page.
  // Conditionally render the button content and the star image using the isFavorite state variable.
  return (
    <InfoWindow
      position={{
        lat: parseFloat(props.location.lat),
        lng: parseFloat(props.location.long),
      }}
      onCloseClick={props.closed}
    >
      <div className="InfoContainer">
        <h1>{props.location.name}</h1>
        <h2>
          {props.location.country}{" "}
          <img className="Star" src={isFavorite ? starOn : starOff} />
        </h2>
        <h3>
          Wind probability
          <br /> {props.location.probability}%
        </h3>
        <h3>
          Latitude <br /> {props.location.lat}
        </h3>
        <h3>
          Longitude <br />
          {props.location.long}
        </h3>
        <h3>When to go: {props.location.month}</h3>
        <button
          className={isFavorite ? "FavButtonRemove" : "FavButtonAdd"}
          onClick={isFavorite ? removeFromFavorites : addToFavorites}
        >
          {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
        </button>
      </div>
    </InfoWindow>
  );
}
