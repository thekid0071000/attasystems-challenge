import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import callApi from "../../utils/methods";
import "./register.css";

export default function Register() {
  // State variables for the username, password and confirm password. Initialized with an empty string.
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  // Live reading of the inputs. For testing purposes.
  useEffect(() => {
    console.log(username, password);
  }, [username, password]);

  // onSubmit function. Handles user submission to the api.
  async function handleSubmit(event) {
    // Prevent default functionality. This prevents the page being refreshed after the form is submitted and the user details will not be shown in the URL.
    event.preventDefault();

    // Password validation regex. Each password needs to have at least 8 characters, one uppercase letter, one special character and a number.
    var passwordValidation = new RegExp(
      /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[A-Z])[a-zA-Z0-9!@#$%^&*]{8,}$/
    );

    // Password validation logic.

    // First, check whether each of the inputs are empty.
    if (username === "") {
      // If the username input is empty, display the correct message.
      alert("Please enter a username!");
    } else if (password === "") {
      // If the password input is empty, display the correct message.
      alert("Please enter a password!");
    } else if (passwordConfirm === "") {
      // If the confirm password input is empty, display the correct message.
      alert("Please confirm your password!");
    } else if (!passwordValidation.test(password)) {
      // If the password validation test fails, display the correct message.
      alert(
        "Password should contain at least 8 characters, an uppercasae letter, a number and a special character (!@#$%^&*)!"
      );
    } else if (password !== passwordConfirm) {
      // If passwords do not match, display the correct message
      alert("Passwords must match!");
    } else {
      // If the password matches all the criteria, send a POST request to the api.
      const res = await callApi("user", "POST", {
        username: username,
        password: password,
      });

      // Alert the user that the registration was successful!
      alert("Registration successful!");
    }
  }

  // The HTML elements for the Registration form. It contains a username input, a password input and a confirm password input.

  // This is similar to the Form.js file inside the project, each input containing an onChange function
  // that will enable the state variables to update themselves depending on the input that is changing.

  // At the bottom, there is a redirect link to the Login page in case the user has already registered on the website.
  return (
    <form
      className="RegisterForm"
      onSubmit={(event) => {
        handleSubmit(event);
      }}
    >
      <h1 className="RegTitle">Register</h1>
      <label htmlFor="username">Username:</label>
      <input
        className="UserNameRegister"
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
        className="PasswordRegister"
        type="password"
        placeholder="Password"
        name="password"
        onChange={(event) => {
          setPassword(event.target.value);
        }}
        value={password}
      />

      <label htmlFor="passwordConfirm">Confirm Password:</label>
      <input
        className="PasswordConfirmInput"
        type="password"
        placeholder="Confirm Password"
        name="passwordConfirm"
        onChange={(event) => {
          setPasswordConfirm(event.target.value);
        }}
        value={passwordConfirm}
      />
      <button className="RegisterButton">Register</button>

      <h2 className="LoginH2">Already have an account? Login here: </h2>
      <Link to={"/form"} className="LoginLink">
        Login
      </Link>
    </form>
  );
}
