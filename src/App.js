import "./App.css";
import { Routes, BrowserRouter, Route } from "react-router-dom";
import Form from "./components/form/Form";
import Register from "./components/register/Register";
import Dashboard from "./components/dashboard/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path={"/"} element={<Form />} />
          <Route path={"/dashboard"} element={<Dashboard />} />
          <Route path={"/register"} element={<Register />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
