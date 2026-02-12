// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { getFirestore, collection, addDoc, getDocs, updateDoc, deleteDoc, doc, query, orderBy, serverTimestamp } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCh5w0Vljp-7dV_Ui_8gTXj_WKF5TyEToA",
    authDomain: "wilson-health-care.firebaseapp.com",
    projectId: "wilson-health-care",
    storageBucket: "wilson-health-care.firebasestorage.app",
    messagingSenderId: "60179173764",
    appId: "1:60179173764:web:adfda13ac51d1140a00dd1",
    measurementId: "G-KT8FX5KZEB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

// Google Auth Provider
const provider = new GoogleAuthProvider();

// Export Firebase services
export { app, analytics, auth, db, provider, GoogleAuthProvider, signInWithPopup, signOut, collection, addDoc, getDocs, updateDoc, deleteDoc, doc, query, orderBy, serverTimestamp };
