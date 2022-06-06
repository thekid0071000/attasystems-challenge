import { useState, useEffect } from "react";
import callApi from "../../utils/methods";
import { Link, useNavigate } from "react-router-dom";

export default function Form() {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    console.log(username, password);
  }, [username, password]);

  async function handleSubmit(event) {
    event.preventDefault();
    const res = await callApi("login", "GET");
    const body = await res.json();

    const user = body.filter((data) => {
      if (data.username === username && data.password === password) {
        return { username: data.username, password: data.password };
      }
    });

    if (user.length === 0) {
      alert("Incorrect username or password!");
    } else {
      navigate("/dashboard");
    }
  }

  return (
    <form
      onSubmit={(event) => {
        handleSubmit(event);
      }}
    >
      <label htmlFor="username">User name:</label>
      <input
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
        type="password"
        placeholder="Password"
        name="password"
        onChange={(event) => {
          setPassword(event.target.value);
        }}
        value={password}
      />
      <button>Login</button>

      <h2>Not registered yet? Click here: </h2>
      <Link to={"/register"}>Register</Link>
    </form>
  );
}
