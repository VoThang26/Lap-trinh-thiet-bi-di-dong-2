// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDhixPphI6fVSWxj89M2VEMacL6TwYzTiE",
  authDomain: "emaple1-9e3f7.firebaseapp.com",
  projectId: "emaple1-9e3f7",
  storageBucket: "emaple1-9e3f7.appspot.com",
  messagingSenderId: "817420206387",
  appId: "1:817420206387:web:8f9114abd6d951835b3e46",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
const db = getFirestore(app);

export { auth, db };
