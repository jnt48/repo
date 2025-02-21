// src/shared/firebase/firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCWdekgRRTQTjD65RMVY8ae53DorZVcmGE",
  authDomain: "friday-f460c.firebaseapp.com",
  projectId: "friday-f460c",
  storageBucket: "friday-f460c.firebasestorage.app",
  messagingSenderId: "613742547596",
  appId: "1:613742547596:web:c98c5a4171f7664406a1a9",
  measurementId: "G-YVD94TLSGJ"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const firestore = getFirestore(app);
export const storage = getStorage(app);
export const database = getDatabase(app);
