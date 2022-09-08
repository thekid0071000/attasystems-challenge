import { useEffect, useState } from "react";
import "./dashboard.css";
import callApi from "../../utils/methods";
import Table from "../../components/Table/Table";
import Map from "../../components/Map/Map";
import Navbar from "../../components/Navbar/Navbar";

export default function Dashboard() {
  // Create a variable in state that will store all the locations from the API.
  const [locations, setLocations] = useState([]);

  // Get all the locations from the API on the first render of the page and store them in state.
  useEffect(() => {
    async function getLocations() {
      const res = await callApi("spot", "GET");
      const body = await res.json();
      setLocations(body);
    }

    getLocations();
  }, []);

  // Return a Map and Table component that will display all the locations.
  return (
    <div className="GoogleMap">
      <Navbar />
      <Map locations={locations} />
      <h1>Locations</h1>
      <Table elements={locations} />
    </div>
  );
}
