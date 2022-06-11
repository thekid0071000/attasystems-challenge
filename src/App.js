import "./App.css";
import { Routes, BrowserRouter, Route } from "react-router-dom";
import Form from "./pages/form/Form";
import Register from "./pages/register/Register";
import Dashboard from "./pages/dashboard/Dashboard";
import UserProvider from "./components/Context/UserContext";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import NotFound from "./components/NotFound/NotFound";

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <div className="App">
          <Routes>
            <Route path={"/form"} element={<Form />} />

            <Route
              path={"/dashboard"}
              element={
                // Protect the Dashboard page using the PrivateRoute component. This prevents the page from being accessed from the URL path.
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />

            <Route path={"/register"} element={<Register />} />
            <Route path={"/"} element={<Form />} />
            <Route path={"*"} element={<NotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
