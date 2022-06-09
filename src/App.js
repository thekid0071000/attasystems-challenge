import "./App.css";
import { Routes, BrowserRouter, Route } from "react-router-dom";
import Form from "./pages/form/Form";
import Register from "./pages/register/Register";
import Dashboard from "./pages/dashboard/Dashboard";
import UserProvider from "./components/Context/UserContext";

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <div className="App">
          <Routes>
            <Route path={"/"} element={<Form />} />
            <Route path={"/form"} element={<Form />} />
            <Route path={"/dashboard"} element={<Dashboard />} />
            <Route path={"/register"} element={<Register />} />
          </Routes>
        </div>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
