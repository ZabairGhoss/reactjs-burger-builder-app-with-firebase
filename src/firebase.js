import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBNv9oihVZ1pEyc0H8kaEkNmENnSMDscKo",
  authDomain: "burger-builder-app-cb37f.firebaseapp.com",
  projectId: "burger-builder-app-cb37f",
  storageBucket: "burger-builder-app-cb37f.appspot.com",
  messagingSenderId: "629686704139",
  appId: "1:629686704139:web:b5a94176c66e6966968f0e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export default app;
