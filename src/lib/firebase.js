import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, addDoc } from "firebase/firestore";

// const firebaseConfig = {
//   apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
//   authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
// };
const firebaseConfig = {
  apiKey: "AIzaSyCShjA3S9a-Ecyxc1Z18XhbNFkRETRC-Sc",
  authDomain: "thewellnesscollective-51b5d.firebaseapp.com",
  projectId: "thewellnesscollective-51b5d",
  storageBucket: "thewellnesscollective-51b5d.appspot.com",
  messagingSenderId: "848996302258",
  appId: "1:848996302258:web:66d9dadfc79b56cbecb8ab"
};



const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
const auth = getAuth(app);
export { auth };
