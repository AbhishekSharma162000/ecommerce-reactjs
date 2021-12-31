import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

const firebaseConfig = {
    apiKey: "AIzaSyCFxPLvZfZBpjyO7noOYwmRLEHMSMupg8E",
    authDomain: "ecommerce-with-react-e8eae.firebaseapp.com",
    projectId: "ecommerce-with-react-e8eae",
    storageBucket: "ecommerce-with-react-e8eae.appspot.com",
    messagingSenderId: "309762199793",
    appId: "1:309762199793:web:9c87f991ddc013d47a5950",
    measurementId: "G-W0Z2NCSQ5M"
  };

  firebase.initializeApp(firebaseConfig);

  const auth = firebase.auth();
  const db = firebase.firestore();
  const storage = firebase.storage();

  export {auth, db, storage}