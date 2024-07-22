import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyC77blI3pKHm4icudAe25ZA1pfKgfObtQ4",
  authDomain: "nexus-ddec7.firebaseapp.com",
  projectId: "nexus-ddec7",
  storageBucket: "nexus-ddec7.appspot.com",
  messagingSenderId: "579522470633",
  appId: "1:579522470633:web:3481e5ce497de645620678",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore();
export const storage = getStorage();
