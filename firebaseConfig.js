// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB27smY6PBRA_8wD-5jO9ruKYcJKIY6Ygo",
  authDomain: "snaptrade-2ada8.firebaseapp.com",
  projectId: "snaptrade-2ada8",
  storageBucket: "snaptrade-2ada8.firebasestorage.app",
  messagingSenderId: "779371902625",
  appId: "1:779371902625:web:38da97f5ce1040b3e3e2e0",
  measurementId: "G-TMT7GYN2Z1"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);