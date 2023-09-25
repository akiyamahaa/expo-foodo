import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyC1_Agqpy9sQLlEfaMpocNLxEotYjdBvfI",
  authDomain: "foodo-expo.firebaseapp.com",
  projectId: "foodo-expo",
  storageBucket: "foodo-expo.appspot.com",
  messagingSenderId: "109630712587",
  appId: "1:109630712587:web:7fb7795ebf6bbca469500e",
  measurementId: "G-E2CN3JF878"
};

const firebaseApp = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(firebaseApp);
export const firebaseDb = getFirestore(firebaseApp);
export const firebaseStorage = getStorage(firebaseApp);
export default firebaseApp;
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase
