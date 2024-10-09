import { useEffect } from "react";
import { useParams } from "react-router-dom";
import VehicleModelStore from "../stores/VehicleModelStore";
import { observer } from "mobx-react-lite";

const VehicleModel = observer(() => {
  const { id } = useParams();
  const { vehicleModelData, getVehicleModels, status } = VehicleModelStore;

  useEffect(() => {
    getVehicleModels();
  }, []);

  const vehicle = vehicleModelData.find((vehicle) => vehicle.id === id);

  if (status === "loading") {
    return <div>Loading...</div>;
  }
  if (status === "error") {
    return <div>Error loading vehicle model. Please try again later.</div>;
  }

  return (
    <div className="vehicle-model-details">
      <div key={vehicle.ModelId}>
        <h1>{vehicle.ModelName}</h1>
        <div className="vehicle-model-info">
          <p>
            <strong>Body Style:</strong> {vehicle.BodyStyle}
          </p>
          <p>
            <strong>Engine Type:</strong> {vehicle.EngineType}
          </p>
          <p>
            <strong>Fuel Type:</strong> {vehicle.FuelType}
          </p>
          <p>
            <strong>Horsepower:</strong> {vehicle.HorsePower}
          </p>
          <p>
            <strong>Transmission Type:</strong> {vehicle.TransmissionType}
          </p>
          <p>
            <strong>Year Introduced:</strong> {vehicle.YearIntroduced}
          </p>
        </div>
      </div>
    </div>
  );
});

export default VehicleModel;
