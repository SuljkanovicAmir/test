import React, { useEffect } from "react";
import VehicleModelStore from "../stores/VehicleModelStore";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";

const Home = observer(() => {
  const { vehicleModelData } = VehicleModelStore;

  useEffect(() => {
    VehicleModelStore.getVehicleModels();
    console.log(VehicleModelStore.vehicleModelData.length);
  }, []);

  if (VehicleModelStore.status === "loading") {
    return <div>Loading...</div>;
  }

  if (VehicleModelStore.status === "error") {
    return <div>Error loading vehicle models. Please try again later.</div>;
  }

  return (
    <div>
      <h1>Vehicle Models</h1>
      <div className="vehicle-model-list">
        {vehicleModelData.map((vehicle, index) => (
          <div className="vehicle-model-card" key={index}>
            <Link
              activeclassname="active"
              key={index}
              to={`/home/${vehicle.id}`}
            >
              <div className="vehicle-model-img-div">{vehicle.ModelName}</div>{" "}
            </Link>
            <div className="vehicle-model-description">
              {vehicle.name}
              <div className="vehicle-model-buttons">
                <button onClick={(e) => e}>E</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});

export default Home;
