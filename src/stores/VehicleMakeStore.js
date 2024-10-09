import { observable, runInAction, makeObservable, action } from "mobx";
import VehicleMakeService from "../services/VehicleMakeServices";

class VehicleMakeStore {
  constructor() {
    this.vehicleMakeService = new VehicleMakeService();
    makeObservable(this, {
      vehicleMakeData: observable,
      status: observable,
      totalRecords: observable,
      getVehicleMakes: action,
    });
  }

  vehicleMakeData = [];
  status = "initial";
  totalRecords = 0;

  getVehicleMakes = async () => {
    this.status = "loading";
    try {
      const data = await VehicleMakeService.getAll();
      console.log(data);

      runInAction(() => {
        this.vehicleMakeData = data;
        this.totalRecords = data.length;
        this.status = "success";
      });
    } catch (error) {
      runInAction(() => {
        this.status = "error";
      });
      console.error("Error fetching vehicle makes:", error);
    }
  };
}

export default new VehicleMakeStore();
