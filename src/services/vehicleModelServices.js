import { db } from "./firebase";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
  query,
  where,
} from "firebase/firestore";

const vehicleModelCollectionRef = collection(db, "vehicleModels");

class VehicleModelService {
  async create(vehicleModel) {
    try {
      const docRef = await addDoc(vehicleModelCollectionRef, vehicleModel);
      console.log("Document written with ID: ", docRef.id);
      return docRef;
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  }

  async getAll() {
    try {
      const snapshot = await getDocs(vehicleModelCollectionRef);
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      console.log("VehicleModelService - getAll");
      return data;
    } catch (error) {
      console.error("Error fetching vehicle models: ", error);
      throw error;
    }
  }

  async getVehicleModels(filters) {
    let q = vehicleModelCollectionRef;

    if (filters.make && filters.make.length > 0) {
      q = query(q, where("MakeId", "in", filters.make));
    }

    if (filters.bodyStyle && filters.bodyStyle.length > 0) {
      q = query(q, where("BodyStyle", "in", filters.bodyStyle));
    }

    if (filters.fuelType && filters.fuelType.length > 0) {
      q = query(q, where("FuelType", "in", filters.fuelType));
    }

    if (filters.transmissionType && filters.transmissionType.length > 0) {
      q = query(q, where("TransmissionType", "in", filters.transmissionType));
    }

    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return data;
  }

  static async delete(id) {
    try {
      const docRef = doc(db, "vehicleModels", id);
      await deleteDoc(docRef);
      console.log(`Vehicle model with ID: ${id} deleted successfully.`);
      return { status: 204 };
    } catch (error) {
      console.error("Error deleting vehicle model:", error);
      throw error;
    }
  }
}

export default VehicleModelService;
