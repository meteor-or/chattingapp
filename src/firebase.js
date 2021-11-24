// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCsdifbnp_rXt9tLzsnr9XF4QKGQLFzH30",
  authDomain: "chattingapp-7a4b8.firebaseapp.com",
  projectId: "chattingapp-7a4b8",
  storageBucket: "chattingapp-7a4b8.appspot.com",
  messagingSenderId: "48843628539",
  appId: "1:48843628539:web:c10f8fa5b61a6ef07ef55e",
  measurementId: "G-RJ78CJ1F5L",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
