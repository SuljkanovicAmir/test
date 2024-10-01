import { db } from './firebase';
import { collection, getDocs, addDoc } from 'firebase/firestore';

const vehicleMakeCollection = collection(db, 'vehicleMakes');

class VehicleMakeService {

  async getAll() {
    const snapshot = await getDocs(vehicleMakeCollection);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }

 
  async create(vehicleMake) {
    try {
      const docRef = await addDoc(vehicleMakeCollection, vehicleMake);
      return { id: docRef.id, ...vehicleMake };
    } catch (error) {
      console.error("Error adding vehicle make: ", error);
      throw error;
    }
  }


}

export default new VehicleMakeService();
