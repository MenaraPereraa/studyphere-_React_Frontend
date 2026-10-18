import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth"; // Auth එකතු කළා

const firebaseConfig = {
  apiKey: "AIzaSyAeH1gTpFyW13S3II51ebUNMGGKIkOLU_I",
  authDomain: "studysphere-87b0b.firebaseapp.com",
  projectId: "studysphere-87b0b",
  storageBucket: "studysphere-87b0b.firebasestorage.app",
  messagingSenderId: "936025376859",
  appId: "1:936025376859:web:e7f7555e463a69bf76d77e",
  measurementId: "G-7LZ94KDPEF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);
export const db = getFirestore(app);
export const auth = getAuth(app);

export default app;