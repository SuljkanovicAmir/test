import { useEffect, useState } from "react";
import VehicleModelStore from "../stores/VehicleModelStore";
import VehicleMakeStore from "../stores/VehicleMakeStore";
import { observer } from "mobx-react-lite";

const AddModel = observer(({ closeModal }) => {
  const [selectedMake, setSelectedMake] = useState(null);
  const [bodyStyle, setBodyStyle] = useState("");
  const [transmission, setTransmission] = useState("");
  const [fuelType, setFuelType] = useState("");
  const [horsePower, setHorsePower] = useState("");
  const [modelName, setModelName] = useState("");
  const { vehicleMakeData } = VehicleMakeStore;

  useEffect(() => {
    VehicleMakeStore.getVehicleMakes();
  }, []);

  const generateRandomId = () => {
    return Math.floor(Math.random() * 1e16);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newModel = {
      ModelName: modelName,

      BodyStyle: bodyStyle,
      TransmissionType: transmission,
      FuelType: fuelType,
      HorsePower: parseInt(horsePower),
      MakeId: parseInt(selectedMake),
      ModelId: generateRandomId(),
    };
    await VehicleModelStore.addVehicleModel(newModel);

    closeModal();
  };

  return (
    <div className="form-box">
      <form onSubmit={handleSubmit}>
        <div className="inputbox">
          <input
            type="text"
            name="modelName"
            onChange={(e) => setModelName(e.target.value)}
            maxLength={20}
            required
          />
          <label
            className={modelName ? "label active" : ""}
            htmlFor="modelName"
          >
            Model Name
          </label>
        </div>
        <div className="inputbox second">
          <input
            type="number"
            name="horsePower"
            min={0}
            maxLength={7}
            value={horsePower}
            onChange={(e) => setHorsePower(e.target.value)}
          />
          <label
            className={horsePower ? "label active" : ""}
            htmlFor="horsePower"
          >
            Horse Power
          </label>
        </div>

        <select onChange={(e) => setSelectedMake(e.target.value)}>
          <option value="">Select Make</option>
          {vehicleMakeData.map((make) => (
            <option key={make.id} value={make.MakeId}>
              {make.MakeName}
            </option>
          ))}
        </select>

        <select onChange={(e) => setBodyStyle(e.target.value)} required>
          <option value="">Select Body</option>
          {["SUV", "Sedan", "Coupe", "Hatchback", "Truck"].map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>

        <select onChange={(e) => setTransmission(e.target.value)} required>
          <option value="">Select Transmission</option>
          {["Automatic", "Manual"].map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
        <select onChange={(e) => setFuelType(e.target.value)} required>
          <option value="">Select Fuel Type</option>
          {["Gasoline", "Diesel", "Electric"].map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>

        <button type="submit">Add Model</button>
      </form>
    </div>
  );
});

export default AddModel;
