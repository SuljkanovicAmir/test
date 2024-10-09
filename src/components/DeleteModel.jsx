import { observer } from "mobx-react";
import VehicleModelStore from "../stores/VehicleModelStore";

const DeleteModel = observer(({ vehicleId }) => {
  const handleDelete = async (e) => {
    e.preventDefault();
    VehicleModelStore.deleteVehicleModel(vehicleId);
    console.log(vehicleId);
  };
  return (
    <button className="btn delete" onClick={handleDelete}>
      Delete
    </button>
  );
});
export default DeleteModel;
