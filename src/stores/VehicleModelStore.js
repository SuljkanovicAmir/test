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
      totalPages: computed,
    });
  }

  vehicleModelData = [];
  status = "initial";
  searchQuery = null;
  pageNumber = 1;
  totalRecords = 0;
  sortBy = "name|asc";

  getVehicleModels = async () => {
    this.status = "loading";
    try {
      let params = {
        rpp: 9,
      };
      if (this.sortBy) params.sort = this.sortBy;
      if (this.pageNumber) params.page = this.pageNumber;
      if (this.searchQuery) params.searchQuery = this.searchQuery;

      const data = await VehicleModelService.getAll();
      console.log(data.length);
      runInAction(() => {
        this.vehicleModelData = data;
        this.totalRecords = data.length;
        this.status = "success";
      });
    } catch (error) {
      runInAction(() => {
        this.status = "error";
      });
      console.error("Error fetching vehicle models:", error);
    }
  };

  //
  addVehicleModel = async (model) => {
    this.status = "loading";
    try {
      const addedModel = await this.vehicleModelService.create(model);
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

  // Delete a vehicle model from Firebase
  deleteVehicleModel = async (id) => {
    this.status = "loading";
    try {
      await this.vehicleModelService.delete(id);
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

  get totalPages() {
    return Math.ceil(this.totalRecords / 9);
  }
}

export default new VehicleModelStore();
