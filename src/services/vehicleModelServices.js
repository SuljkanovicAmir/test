import { db } from "./firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";

const vehicleModelCollectionRef = collection(db, "vehicleModels");

class VehicleModelService {
  static async create(vehicleModel) {
    try {
      const docRef = await addDoc(vehicleModelCollectionRef, vehicleModel);
      console.log("Document written with ID: ", docRef.id);
      return docRef;
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  }

  static async getAll() {
    try {
      const snapshot = await getDocs(vehicleModelCollectionRef);
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      return data;
    } catch (error) {
      console.error("Error fetching vehicle models: ", error);
      throw error;
    }
  }
}

export default VehicleModelService;
