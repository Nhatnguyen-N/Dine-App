// Import the functions you need from the SDKs you need
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { initializeApp } from "firebase/app";
//@ts-ignore
import { getReactNativePersistence, initializeAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAmD_07CxucI5xmELLwHjJzwHsnoxQ0EpM",
  authDomain: "dine-time-app-e192d.firebaseapp.com",
  projectId: "dine-time-app-e192d",
  storageBucket: "dine-time-app-e192d.firebasestorage.app",
  messagingSenderId: "242972927314",
  appId: "1:242972927314:web:5dc239767cd1571275468b",
  measurementId: "G-RKBGEWM4QZ"
};

// Initialize Firebase
// const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
export const db = getFirestore(app);