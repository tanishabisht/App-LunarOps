// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBOjYTD-ZtabuHvOPL59fb8M3jt6sYT9D4",
  authDomain: "lunarops5.firebaseapp.com",
  projectId: "lunarops5",
  storageBucket: "lunarops5.appspot.com",
  messagingSenderId: "383925347773",
  appId: "1:383925347773:web:d2fbca19c41feec7beded4",
  measurementId: "G-NV052EJS35"
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