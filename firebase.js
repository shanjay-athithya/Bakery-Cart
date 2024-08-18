// firebase.js

import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// Your Firebase configuration object
const firebaseConfig = {
  apiKey: "AIzaSyCdRpNWBBfkOG5a7Yh0Cn-Fs6TOTBIoRa0",
  authDomain: "golden-pakkada.firebaseapp.com",
  projectId: "golden-pakkada",
  storageBucket: "golden-pakkada.appspot.com",
  messagingSenderId: "635295735979",
  appId: "1:635295735979:web:6c62acf6f3eb4d76f8d7ee",
  measurementId: "G-RPSK896Z7E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Set up authentication
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
