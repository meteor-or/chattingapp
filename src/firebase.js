import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/database";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCsdifbnp_rXt9tLzsnr9XF4QKGQLFzH30",
  authDomain: "chattingapp-7a4b8.firebaseapp.com",
  projectId: "chattingapp-7a4b8",
  storageBucket: "chattingapp-7a4b8.appspot.com",
  messagingSenderId: "48843628539",
  appId: "1:48843628539:web:c10f8fa5b61a6ef07ef55e",
  measurementId: "G-RJ78CJ1F5L",
  databaseURL:
    "https://chattingapp-7a4b8-default-rtdb.asia-southeast1.firebasedatabase.app",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
