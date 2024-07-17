// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCHW3QTB1HZoCFSEbjbzHg0GZj1ptFTLco",
  authDomain: "blogimage-ba6c5.firebaseapp.com",
  projectId: "blogimage-ba6c5",
  storageBucket: "blogimage-ba6c5.appspot.com",
  messagingSenderId: "933557142701",
  appId: "1:933557142701:web:97791bed4b9a159c973224"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export { app };