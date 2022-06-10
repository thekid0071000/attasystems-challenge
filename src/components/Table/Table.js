import React from "react";
import "./table.css";
import { nanoid } from "nanoid";

export default function Table(props) {
  // Displays a table containing information about all locations, received as props from the Dashboard.
  // Conditionally color each row depending on whether the index is an odd or even number for better readability.
  const mapLocations = props.elements.map((location, index) => {
    return (
      <tr
        key={nanoid()}
        style={
          index % 2 === 0
            ? { backgroundColor: "white" }
            : { backgroundColor: "#F3F3F3" }
        }
      >
        <td>{location.name}</td>
        <td>{location.country}</td>
        <td>{location.lat}</td>
        <td>{location.long}</td>
        <td>{location.probability}%</td>
        <td>{location.month}</td>
      </tr>
    );
  });

  // Return a table header with titles for each piece of information.
  return (
    <table className="LocationsTable">
      <tr>
        <th>Name</th>
        <th>Country</th>
        <th>Latitude</th>
        <th>Longitude</th>
        <th>Wind Prob.</th>
        <th>When to go</th>
      </tr>
      {mapLocations}
    </table>
  );
}
