// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC3r-5ee8CwFc_Wx15BkxHnBVkWUeUgQFc",
  authDomain: "appmusic-4448d.firebaseapp.com",
  databaseURL: "https://appmusic-4448d-default-rtdb.firebaseio.com",
  projectId: "appmusic-4448d",
  storageBucket: "appmusic-4448d.appspot.com",
  messagingSenderId: "448243257939",
  appId: "1:448243257939:web:197906adf7b55c4c6f2ca6",
  measurementId: "G-TJBS0CHKCM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const database = getDatabase(app);