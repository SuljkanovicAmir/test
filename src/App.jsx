import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import NavBar from "./components/NavBar";
import VehicleMakes from "./pages/VehicleMakes";
import VehicleModel from "./pages/VehicleModel";

const App = () => {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/vehicle-model/:id" element={<VehicleModel />} />
        <Route path="/vehicle-makes" element={<VehicleMakes />} />
      </Routes>
    </Router>
  );
};

export default App;
