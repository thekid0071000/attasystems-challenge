import { useEffect, useState, useContext } from "react";
import "./dashboard.css";
import callApi from "../../utils/methods";
import Table from "../../components/Table/Table";
import Map from "../../components/Map/Map";

export default function Dashboard() {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    async function getLocations() {
      const res = await callApi("spot", "GET");
      const body = await res.json();
      setLocations(body);
    }

    getLocations();
  }, []);

  return (
    <div className="GoogleMap">
      <Map locations={locations} />
      <h1>Locations</h1>
      <Table elements={locations} />
    </div>
  );
}
