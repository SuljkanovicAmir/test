import { useEffect } from "react";

import VehicleMakeStore from "../stores/VehicleMakeStore";
import { observer } from "mobx-react";
import Loading from "../components/Loading";

const VehicleMakes = observer(() => {
  const { vehicleMakeData } = VehicleMakeStore;

  useEffect(() => {
    VehicleMakeStore.getVehicleMakes();
  }, []);

  if (VehicleMakeStore.status === "loading") {
    return Loading;
  }

  if (VehicleMakeStore.status === "error") {
    return <div>Error loading vehicle models. Please try again later.</div>;
  }

  return (
    <div className="vehicle-makes">
      <h1 className="title">Vehicle Makes</h1>
      <div className="vehicle-model-list">
        {vehicleMakeData.map((vehicle, index) => (
          <div className="vehicle-make-card" key={index}>
            <div className="vehicle-make-name" key={index}>
              <div className="vehicle-abrv">{vehicle.Abrv}</div>
              <div className="vehicle-name">{vehicle.MakeName}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});

export default VehicleMakes;
