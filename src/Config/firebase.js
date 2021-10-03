// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAYwSFwgaq-BkJYJsSGxzCqxhqKumAybr8",
  authDomain: "lunarops3-c9109.firebaseapp.com",
  projectId: "lunarops3-c9109",
  storageBucket: "lunarops3-c9109.appspot.com",
  messagingSenderId: "721215952742",
  appId: "1:721215952742:web:bae48800821088f8375aa7"
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