import {
  observable,
  runInAction,
  makeObservable,
  action,
  computed,
} from "mobx";
import VehicleModelService from "../services/vehicleModelServices";

class VehicleModelStore {
  constructor() {
    this.vehicleModelService = new VehicleModelService();
    this.setFilters = this.setFilters.bind(this);

    makeObservable(this, {
      vehicleModelData: observable,
      status: observable,
      searchQuery: observable,
      pageNumber: observable,
      totalRecords: observable,
      sortBy: observable,
      getVehicleModels: action,
      addVehicleModel: action,
      updateVehicleModel: action,
      deleteVehicleModel: action,
      setFilters: action,
      setSorting: action,
      setPage: action,
      totalPages: computed,
      filters: observable,
    });
  }

  vehicleModelData = [];
  status = "initial";
  searchQuery = null;
  pageNumber = 1;
  totalRecords = 0;
  sortBy = "name|asc";
  filters = {
    make: [],
    bodyStyle: [],
    fuelType: [],
    transmissionType: [],
  };

  addVehicleModel = async (model) => {
    this.status = "loading";
    try {
      const addedModel = await this.vehicleModelService.create(model);
      const data = this.getVehicleModels(this.filters);
      console.log(data);
      runInAction(() => {
        this.vehicleModelData = [...this.vehicleModelData, addedModel];
        this.totalRecords++;
        this.status = "success";
      });
    } catch (error) {
      runInAction(() => {
        this.status = "error";
      });
      console.error("Error adding vehicle model:", error);
    }
  };

  updateVehicleModel = async (id, updatedModel) => {
    this.status = "loading";
    try {
      await this.vehicleModelService.update(id, updatedModel);
      runInAction(() => {
        this.vehicleModelData = this.vehicleModelData.map((item) =>
          item.id === id ? updatedModel : item
        );
        this.status = "success";
      });
    } catch (error) {
      runInAction(() => {
        this.status = "error";
      });
      console.error("Error updating vehicle model:", error);
    }
  };

  async getVehicleModels(filters) {
    this.status = "loading";
    console.log("Fetching vehicle models:", filters);
    try {
      console.log(filters);
      const vehicleModels = await this.vehicleModelService.getVehicleModels(
        filters
      );
      console.log("Fetching by filter");
      runInAction(() => {
        this.vehicleModelData = vehicleModels;
        this.status = "success";
      });
    } catch (error) {
      runInAction(() => {
        this.status = "error";
      });
      console.error("Error fetching vehicle models:", error);
    }
  }

  deleteVehicleModel = async (id) => {
    this.status = "loading";
    console.log(id);
    try {
      await VehicleModelService.delete(id);
      runInAction(() => {
        this.vehicleModelData = this.vehicleModelData.filter(
          (item) => item.id !== id
        );
        this.totalRecords--;
        this.status = "success";
      });
    } catch (error) {
      runInAction(() => {
        this.status = "error";
      });
      console.error("Error deleting vehicle model:", error);
    }
  };

  setFilters(filters) {
    console.log("Current filters:", this.filters);
    console.log("Incoming filters:", filters);

    this.filters = { ...this.filters, ...filters };
    this.pageNumber = 1;

    this.getVehicleModels(this.filters);
  }

  setSorting(sortBy) {
    this.sortBy = sortBy;
    this.getVehicleModels();
  }

  setPage(pageNumber) {
    this.pageNumber = pageNumber;
    this.getVehicleModels();
  }

  get totalPages() {
    return Math.ceil(this.totalRecords / 9);
  }
}

export default new VehicleModelStore();
