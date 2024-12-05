import { initializeApp } from "firebase/app";
import { getDatabase, ref, push, onValue } from "firebase/database";
import { getAuth, GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, sendPasswordResetEmail } from "firebase/auth";

const config = {
  apiKey: "AIzaSyB14FuErMS0Q6TalbAElWBk1U8hMYODUBg",
  authDomain: "firevuechat-8bc8d.firebaseapp.com",
  projectId: "firevuechat-8bc8d",
  storageBucket: "firevuechat-8bc8d.firebasestorage.app",
  messagingSenderId: "227144691285",
  appId: "1:227144691285:web:68d266699809d008e1eedc"
};

// Initialize Firebase
const app = initializeApp(config);
const db = getDatabase(app);
const auth = getAuth(app); // Firebase Authentication

// Google Auth Provider
const googleProvider = new GoogleAuthProvider();

export { db, ref, push, onValue, auth, googleProvider, signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, sendPasswordResetEmail };
