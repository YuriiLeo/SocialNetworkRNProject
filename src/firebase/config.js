import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBKi-urONM3oY-jwZAmG6W5FCV2agEvyMg",
  authDomain: "rn-hw-project.firebaseapp.com",
  projectId: "rn-hw-project",
  storageBucket: "rn-hw-project.appspot.com",
  messagingSenderId: "695295379923",
  appId: "1:695295379923:web:d8c88f30e6263891658726",
  measurementId: "G-LH5PBRBCBM",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);
