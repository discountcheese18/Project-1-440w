import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

//apiKey: "AIzaSyArmHDB3UYh-naRf52PNG-YtjKuvKUdE_k",
const firebaseConfig = {
  apiKey: "AIzaSyArmHDB3UYh-naRf52PNG-YtjKuvKUdE_k",
  authDomain: "health-market-440w.firebaseapp.com",
  projectId: "health-market-440w",
  storageBucket: "health-market-440w.firebasestorage.app",
  messagingSenderId: "798891652917",
  appId: "1:798891652917:web:960e261d44bd3872d5be7c",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);