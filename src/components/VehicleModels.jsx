import { useEffect, useState } from "react";

import { observer } from "mobx-react-lite";
import VehicleModelStore from "../stores/VehicleModelStore";
import VehicleMakeStore from "../stores/VehicleMakeStore";
import ArrowImg from "../assets/arrow.svg";
import Loading from "./Loading";
import VehicleModelCard from "./VehicleModelCard";

const VehicleModels = observer(() => {
  const { vehicleModelData, getVehicleModels, setFilters } = VehicleModelStore;

  const [selectedMakes, setSelectedMakes] = useState([]);
  const [selectedBodyStyles, setSelectedBodyStyles] = useState([]);
  const [selectedFuelTypes, setSelectedFuelTypes] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6;
  const [selectedTransmissionTypes, setSelectedTransmissionTypes] = useState(
    []
  );

  useEffect(() => {
    getVehicleModels();
    VehicleMakeStore.getVehicleMakes();
  }, []);

  const sortedVehicleModels = [...vehicleModelData].sort((a, b) => {
    if (sortOrder === "asc") {
      return a.ModelName > b.ModelName ? 1 : -1;
    } else {
      return a.ModelName < b.ModelName ? 1 : -1;
    }
  });

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedVehicleModels = sortedVehicleModels.slice(
    startIndex,
    endIndex
  );

  const totalPages = Math.ceil(vehicleModelData.length / pageSize);

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  const handleMakeFilterChange = (e) => {
    const makeId = parseInt(e.target.value);
    if (selectedMakes.includes(makeId)) {
      setSelectedMakes(selectedMakes.filter((id) => id !== makeId));
    } else {
      setSelectedMakes([...selectedMakes, makeId]);
    }
  };

  const handleResetFilters = () => {
    setSelectedMakes([]);
    setSelectedBodyStyles([]);
    setSelectedFuelTypes([]);
    setSelectedTransmissionTypes([]);
    setFilters({
      make: [],
      bodyStyle: [],
      fuelType: [],
      transmissionType: [],
    });
  };

  const handleBodyStyleFilterChange = (bodyStyle) => {
    if (selectedBodyStyles.includes(bodyStyle)) {
      setSelectedBodyStyles(
        selectedBodyStyles.filter((style) => style !== bodyStyle)
      );
    } else {
      setSelectedBodyStyles([...selectedBodyStyles, bodyStyle]);
    }
  };

  const handleFuelTypeFilterChange = (fuelType) => {
    if (selectedFuelTypes.includes(fuelType)) {
      setSelectedFuelTypes(
        selectedFuelTypes.filter((type) => type !== fuelType)
      );
    } else {
      setSelectedFuelTypes([...selectedFuelTypes, fuelType]);
    }
  };
  const handleTransmissionTypeFilterChange = (transmissionType) => {
    if (selectedTransmissionTypes.includes(transmissionType)) {
      setSelectedTransmissionTypes(
        selectedTransmissionTypes.filter((type) => type !== transmissionType)
      );
    } else {
      setSelectedTransmissionTypes([
        ...selectedTransmissionTypes,
        transmissionType,
      ]);
    }
  };
  useEffect(() => {
    setFilters({
      make: selectedMakes.length > 0 ? selectedMakes : [],
      bodyStyle: selectedBodyStyles.length > 0 ? selectedBodyStyles : [],
      fuelType: selectedFuelTypes.length > 0 ? selectedFuelTypes : [],
      transmissionType:
        selectedTransmissionTypes.length > 0 ? selectedTransmissionTypes : [],
    });
    setCurrentPage(1);
  }, [
    selectedMakes,
    selectedBodyStyles,
    selectedFuelTypes,
    selectedTransmissionTypes,
    setFilters,
  ]);

  return (
    <div className="vehicle-models">
      <div className="filters-div">
        <div className="filters-sort-div">
          <select onChange={handleSortChange} value={sortOrder}>
            <option value="asc">Sort by Model Name: A-Z</option>
            <option value="desc">Sort by Model Name: Z-A</option>
          </select>
        </div>
        <div>
          <div className="dropdown">
            <button className="dropbtn">Brand</button>
            <div className="dropdown-content">
              {VehicleMakeStore.vehicleMakeData.map((make) => (
                <div
                  key={make.MakeId}
                  className="dropdown-input"
                  onClick={() =>
                    handleMakeFilterChange({ target: { value: make.MakeId } })
                  }
                >
                  <input
                    type="checkbox"
                    checked={selectedMakes.includes(make.MakeId)}
                    readOnly
                  />
                  {make.MakeName}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div>
          <div className="dropdown">
            <button className="dropbtn">Body</button>
            <div className="dropdown-content">
              {["SUV", "Sedan", "Coupe", "Hatchback", "Truck"].map((style) => (
                <div
                  key={style}
                  className="dropdown-input"
                  onClick={() => handleBodyStyleFilterChange(style)}
                >
                  <input
                    type="checkbox"
                    checked={selectedBodyStyles.includes(style)}
                    readOnly
                  />
                  {style}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div>
          <div className="dropdown">
            <button className="dropbtn">Fuel</button>
            <div className="dropdown-content">
              {["Gasoline", "Diesel", "Electric"].map((type) => (
                <div
                  key={type}
                  className="dropdown-input"
                  onClick={() => handleFuelTypeFilterChange(type)}
                >
                  <input
                    type="checkbox"
                    checked={selectedFuelTypes.includes(type)}
                    readOnly
                  />
                  {type}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div>
          <div className="dropdown">
            <button className="dropbtn">Transmission</button>
            <div className="dropdown-content">
              {["Automatic", "Manual"].map((type) => (
                <div
                  key={type}
                  className="dropdown-input"
                  onClick={() => handleTransmissionTypeFilterChange(type)}
                >
                  <input
                    type="checkbox"
                    checked={selectedTransmissionTypes.includes(type)}
                    readOnly
                  />
                  {type}
                </div>
              ))}
            </div>
          </div>
        </div>
        <button onClick={handleResetFilters} className="reset-filters-btn">
          Reset Filters
        </button>
      </div>
      {VehicleModelStore.status === "loading" && <Loading />}
      {VehicleModelStore.status === "error" && (
        <div>Error loading vehicle models. Please try again later.</div>
      )}
      <div className="vehicle-model-list">
        {paginatedVehicleModels.map((vehicle, index) => (
          <VehicleModelCard vehicle={vehicle} key={index} />
        ))}
      </div>

      <div className="pagination-controls">
        <button
          className="arrow-btn left"
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
        >
          <img src={ArrowImg} alt="" />
        </button>
        <span>
          {currentPage} of {totalPages}
        </span>
        <button
          className="arrow-btn"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          <img src={ArrowImg} alt="" />
        </button>
      </div>
    </div>
  );
});

export default VehicleModels;
