import { useEffect } from "react";
import { observer } from "mobx-react-lite";

import VehicleModelStore from "./stores/VehicleModelStore";

const App = observer(() => {
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

      <ul>
        {vehicleModelData.map((model) => (
          <li key={model.id}>
            {model.ModelName} ({model.BodyStyle}) - Make ID: {model.MakeId}
          </li>
        ))}
      </ul>
    </div>
  );
});

export default App;
