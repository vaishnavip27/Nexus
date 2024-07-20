import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "import.meta.env.REACT_APP_API_KEY",
  authDomain: "nexus-ddec7.firebaseapp.com",
  projectId: "nexus-ddec7",
  storageBucket: "nexus-ddec7.appspot.com",
  messagingSenderId: "579522470633",
  appId: "1:579522470633:web:3481e5ce497de645620678",
};

const app = initializeApp(firebaseConfig);
