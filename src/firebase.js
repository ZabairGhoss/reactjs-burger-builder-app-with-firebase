import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA4V0uFmp8dwPJcGYTYge1QGyteqBwsgXY",
  authDomain: "burger-builder-app-5ed15.firebaseapp.com",
  projectId: "burger-builder-app-5ed15",
  storageBucket: "burger-builder-app-5ed15.appspot.com",
  messagingSenderId: "137153435687",
  appId: "1:137153435687:web:72a2c7009a7f9ba72b1602"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export default app;