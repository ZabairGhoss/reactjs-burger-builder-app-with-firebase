import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import CustomNavbar from "./components/CustomNavbar";
import { Routes, Route } from "react-router-dom";
import "./styles/builder-control.css";
import Checkout from "./components/Checkout";
import Order from "./components/Order";
import Register from "./components/Register";
import { AuthContextProvider } from "./components/contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import BurgerApp from "./components/BurgerApp";

function App() {
  return (
    <div className="App">
      <AuthContextProvider>
        <CustomNavbar />
        <Routes>
          <Route exact path="/" element={<BurgerApp />} />
          <Route path="/auth" element={<Register />} />
          <Route
            path="/orders"
            element={
              <ProtectedRoute>
                <Order />
              </ProtectedRoute>
            }
          />
          <Route
            path="/checkout"
            element={
              <ProtectedRoute>
                <Checkout />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthContextProvider>
    </div>
  );
}

export default App;
