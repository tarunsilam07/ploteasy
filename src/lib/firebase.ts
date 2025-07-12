// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAx5kpDd0J2uGLfysbO7ZduKxXik0NRsFE",
  authDomain: "ploteasy-83d75.firebaseapp.com",
  projectId: "ploteasy-83d75",
  storageBucket: "ploteasy-83d75.firebasestorage.app",
  messagingSenderId: "1052480383647",
  appId: "1:1052480383647:web:e2107a2b96b458468190aa"
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
export const auth = getAuth(app);