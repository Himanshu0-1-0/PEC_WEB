// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyC2m4hxLymVJvmETmVbdCAoCkesHaE2eX0",
    authDomain: "pec-web-b52cd.firebaseapp.com",
    projectId: "pec-web-b52cd",
    storageBucket: "pec-web-b52cd.appspot.com",
    messagingSenderId: "1068573692820",
    appId: "1:1068573692820:web:e038811cfe3b1021647581",
    measurementId: "G-K4LW6DCB9D"
};  

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

// Initialize Auth
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const analytics = getAnalytics(app);
const storage = getStorage(app); 

export { app, db, auth,analytics ,googleProvider,signInWithPopup,storage};
