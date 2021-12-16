// Import the functions you need from the SDKs you need
import firebase from "firebase";
import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig()
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: publicRuntimeConfig.api_key,
  authDomain: "whatsapp-d66c0.firebaseapp.com",
  projectId: "whatsapp-d66c0",
  storageBucket: "whatsapp-d66c0.appspot.com",
  messagingSenderId: "115263940685",
  appId: "1:115263940685:web:f4cfa29cab54acc0c9d404"
};

// Initialize Firebase
const app = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();
const db = app.firestore();
const auth = app.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export {db, auth, provider};