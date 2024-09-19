// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBivT8CpKr74UHR_IU4mzkkTQtKM7aNiBk",
  authDomain: "lrdiy-caravan-calculator.firebaseapp.com",
  projectId: "lrdiy-caravan-calculator",
  storageBucket: "lrdiy-caravan-calculator.appspot.com",
  messagingSenderId: "245822968485",
  appId: "1:245822968485:web:ff7925cb6a5151ed7f334c",
  measurementId: "G-LJS6VMYG9P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);