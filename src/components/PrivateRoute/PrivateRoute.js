import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const navigate = useNavigate();

  // This component protects the dashboard page from being accessed unless the user is logged in.
  // (If the user tries to access the page using the URL path.)
  // (Or if a user token is in the browser's storage).
  useEffect(() => {
    if (!localStorage.getItem("access_token")) navigate("/form");
  }, []);
  return children;
}
