// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getDoc, getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCIX3K0VhyYu7AnvgkVx8G8KTqz9c3XN2c",
  authDomain: "letschat-60261.firebaseapp.com",
  projectId: "letschat-60261",
  storageBucket: "letschat-60261.appspot.com",
  messagingSenderId: "362291243256",
  appId: "1:362291243256:web:834c4e67a96520b77df30d"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const doc = getDoc();
export const db = getFirestore;
