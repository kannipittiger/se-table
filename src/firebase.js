import { initializeApp } from "firebase/app";
import { GoogleAuthProvider,getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDx-fmhH2qj5CW0aXYi8jdorFo1-eqNuLo",
  authDomain: "se-test-2cf4d.firebaseapp.com",
  projectId: "se-test-2cf4d",
  storageBucket: "se-test-2cf4d.appspot.com",
  messagingSenderId: "257583461640",
  appId: "1:257583461640:web:d4f77adeb4c3cd5737a8bd",
  measurementId: "G-6Y536F5H9F"
};


const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const googleAuthProvider = new GoogleAuthProvider();

export default app;