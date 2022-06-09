import React from "react";
import "./table.css";
import { nanoid } from "nanoid";

export default function Table(props) {
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
