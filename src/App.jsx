import { useEffect } from "react";
import { Provider } from "mobx-react";

import VehicleModelStore from "./stores/VehicleModelStore";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import NavBar from "./components/NavBar";
import VehicleMakes from "./pages/VehicleMakes";
import VehicleModel from "./pages/VehicleModel";

const App = () => {
  return (
    <Provider VehicleModelStore={VehicleModelStore}>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/vehicle-makes" element={<VehicleMakes />} />
          <Route path="/vehicle-model/:id" element={<VehicleModel />} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
