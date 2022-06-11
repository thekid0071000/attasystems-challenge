import { useEffect, useState } from "react";
import callApi from "../../utils/methods";
import { Link, useNavigate } from "react-router-dom";
import "./form.css";
import sign from "jwt-encode";

// Create a secret for the token.
const secret = "asdmaksclaksmkdasdmakljsbvk";

export default function Form() {
  // Create state variables for the username and password.
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  // Create a navigate variable that will be used to redirect the user to the dashboard.
  const navigate = useNavigate();

  // Prevent a page redirect if the user access token is already in the browser's storage.
  // (Do not allow users to log out unless they click the "Log Out button.")
  useEffect(() => {
    if (localStorage.getItem("access_token")) {
      navigate("/dashboard");
    }
  }, []);
  // Form onSubmit function.
  async function handleSubmit(event) {
    // Prevent default functionality. This prevents the page being refreshed after the form is submitted and the user details will not be shown in the URL.
    event.preventDefault();

    // Gets the users from the "login" endpoint of the API, using the callApi method from methods.js.
    const res = await callApi("user", "GET");
    const body = await res.json();

    // Filter through the users and check whether the input matches the registered credentials inside the API.
    const user = body.filter((data) => {
      if (data.username === username && data.password === password) {
        // If there is a match, return it.
        return { username: data.username, password: data.password };
      }
    });

    // Check if a user has been found. If not, display a message to the user that the username or password is incorrect,
    if (user.length === 0) {
      alert("Incorrect username or password!");
    } else {
      // Separate the password from the rest of the user info.
      const { password, ...rest } = user[0];
      // Sign (encode) the user object using the secret at the top of the file.
      const encodedUser = sign(rest, secret);

      // Set the user inside local storage.
      localStorage.setItem("access_token", encodedUser);

      // Navigate to that dashboard.
      navigate("/dashboard");
    }
  }

  // This is the HTML for the form. It contains two inputs, one for the username and the other for the password.
  // Each input has an onChange method that will update the state variables, and a value property that will store the updated value of each input.
  // At the bottom there is a Link tag to the Register page, if the user does not have an account and chooses to register on the website.
  return (
    <form
      className="Form"
      onSubmit={(event) => {
        handleSubmit(event);
      }}
    >
      <h1 className="Title">Kite</h1>
      <label htmlFor="username">Username:</label>
      <input
        className="UserNameInput"
        type="text"
        placeholder="User Name"
        name="username"
        onChange={(event) => {
          setUserName(event.target.value);
        }}
        value={username}
      />
      <label htmlFor="password">Password:</label>
      <input
        className="PasswordInput"
        type="password"
        placeholder="Password"
        name="password"
        onChange={(event) => {
          setPassword(event.target.value);
        }}
        value={password}
      />
      <button className="LoginButton">Login</button>

      <h2 className="RegisterH2">Not registered yet? Click here: </h2>
      <Link to={"/register"} className="RegisterLink">
        Register
      </Link>
    </form>
  );
}
