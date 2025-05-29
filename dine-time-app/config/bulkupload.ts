import { carouselImages, restaurants, slots } from "@/store/restaurants";
import { collection, doc, setDoc } from "firebase/firestore";
import { db } from "./firebaseConfig";

// const restaurantData = restaurants;
// const carouselImageData = carouselImages;
const slotData = slots;
const uploadData = async () => {
  try {
    for (let i = 0; i < slotData.length; i++) {
      const restaurant = slotData[i];
      const docRef = doc(collection(db, "slots"), `slot_${i + 1}`);
      await setDoc(docRef, restaurant);
    }
    console.log("Data uploaded");

  } catch (error) {
    console.log("Error uploading data", error);

  }
};

export default uploadData;