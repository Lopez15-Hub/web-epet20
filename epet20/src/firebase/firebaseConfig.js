
import { GoogleAuthProvider } from "firebase/auth";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAlHkqAW7Rn54nbNyJhE-evPpAtvJvhGEw",
  authDomain: "epet20-86711.firebaseapp.com",
  projectId: "epet20-86711",
  storageBucket: "epet20-86711.appspot.com",
  messagingSenderId: "389799055614",
  appId: "1:389799055614:web:169beeb47a0fbdc58755af",
  measurementId: "G-GPGDQR38YV"
};
// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

const googleAuth = new GoogleAuthProvider();
export { db, auth, googleAuth, storage,app };