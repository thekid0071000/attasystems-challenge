import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./navbar.css";

export default function Navbar() {
  const navigate = useNavigate();

  // Log out function. When the button is clicked, delete the token from localStorage and redirect to the Login page.
  function onLogOut() {
    localStorage.removeItem("access_token");
    navigate("/");
  }
  return (
    <nav className="Navbar">
      <h1 className="Title">Kite</h1>
      <button className="LogoutButton" onClick={onLogOut}>
        Logout
      </button>
    </nav>
  );
}
