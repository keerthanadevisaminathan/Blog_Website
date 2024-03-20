// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey:import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "blog-website-cee40.firebaseapp.com",
  projectId: "blog-website-cee40",
  storageBucket: "blog-website-cee40.appspot.com",
  messagingSenderId: "79817824220",
  appId: "1:79817824220:web:84614bcd123c75295e2119"
};
export const app = initializeApp(firebaseConfig);