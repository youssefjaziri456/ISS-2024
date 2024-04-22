// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';
import firebase from 'firebase/app';
import 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDyW2eG1nRhGvP1CMG-DoRaZy4cJQfVEdY",
  authDomain: "pawpaw-65e59.firebaseapp.com",
  projectId: "pawpaw-65e59",
  storageBucket: "pawpaw-65e59.appspot.com",
  messagingSenderId: "452307619930",
  appId: "1:452307619930:web:023cb7e983f3d8afcb4863",
  measurementId: "G-X9WWRFWQ5Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const firestore = firebase.firestore();
// Initialize Firestore
export default firestore;