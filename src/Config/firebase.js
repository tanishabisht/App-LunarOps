// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAfPvR33qZ6N2ojX5VXDinzyXILBl7o_cc",
  authDomain: "lunarops2-fac46.firebaseapp.com",
  projectId: "lunarops2-fac46",
  storageBucket: "lunarops2-fac46.appspot.com",
  messagingSenderId: "823516646303",
  appId: "1:823516646303:web:dadf0ea47f84c765df8baa"
};

const getUserHandler = () => {
  onAuthStateChanged(auth, (user) => {
    if (user) return user.email.split('@')[0]
    else return 'No user fetched'
  });
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const auth = getAuth(app)
export const getUser = getUserHandler