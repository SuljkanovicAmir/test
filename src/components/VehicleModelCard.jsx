/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import DeleteModel from "./DeleteModel";

const VehicleModelCard = ({ vehicle, index }) => {
  return (
    <div className="vehicle-model-card" key={index}>
      <Link to={`/vehicle-model/${vehicle.id}`} className="vehicle-model-name">
        <div>{vehicle.ModelName}</div>
      </Link>
      <div className="vehicle-model-description">
        {vehicle.name}
        <div className="vehicle-model-buttons">
          <button disabled className="btn edit">
            Edit
          </button>
          <DeleteModel vehicleId={vehicle.id} />
        </div>
      </div>
    </div>
  );
};

export default VehicleModelCard;
