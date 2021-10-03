// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAQLSnU1BNeRr_5lrVC8Ky9yy6vIL6jK8M",
  authDomain: "lunarops4.firebaseapp.com",
  projectId: "lunarops4",
  storageBucket: "lunarops4.appspot.com",
  messagingSenderId: "1094008664794",
  appId: "1:1094008664794:web:db05db3dbd80a48558abe3",
  measurementId: "G-KKSM4XPNXP"
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