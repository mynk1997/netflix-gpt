// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCwi3RWanwv5r2-TbP7eRnhuVQLha1je-w",
  authDomain: "netflixgpt-17cad.firebaseapp.com",
  projectId: "netflixgpt-17cad",
  storageBucket: "netflixgpt-17cad.appspot.com",
  messagingSenderId: "516042945584",
  appId: "1:516042945584:web:cf4658741208089234e9f5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth();