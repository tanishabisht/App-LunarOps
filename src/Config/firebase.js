// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDttjNKuUs-R0bFhTrBF6Vp6udiXYpS8Dc",
  authDomain: "lunarops-bb7f7.firebaseapp.com",
  projectId: "lunarops-bb7f7",
  storageBucket: "lunarops-bb7f7.appspot.com",
  messagingSenderId: "902643732775",
  appId: "1:902643732775:web:0dd71228f943b9a0965902",
  measurementId: "G-YH1CYE86VC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const auth = getAuth(app)