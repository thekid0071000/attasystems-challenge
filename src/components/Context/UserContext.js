import { createContext, useEffect, useState } from "react";
import jwt_decode from "jwt-decode";

// User login session using JWT.
export const UserContext = createContext(null);

const UserProvider = ({ children }) => {
  // Initialize user state.
  const [user, setUser] = useState(null);

  // Set decoded user only once, after log in.
  useEffect(() => {
    let enabled = true;
    if (enabled) {
      // Get the token from localStorage.
      const access_token = localStorage.getItem("access_token");

      // If the access token is null, return. If it is not null, set the decoded user.
      if (!access_token) {
        setUser(null);
      } else {
        // Decode token.
        const decoded = jwt_decode(access_token);

        // Set decoded user.
        setUser(decoded);
      }
    }
    return () => {
      enabled = false;
    };
  }, []);
  // Return the value.
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

export default UserProvider;
