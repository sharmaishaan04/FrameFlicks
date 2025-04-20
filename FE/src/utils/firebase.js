// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB8MqyBgDC5BRqOBrniMs3JPIcFefxYZfQ",
  authDomain: "frameflicks-47a1c.firebaseapp.com",
  projectId: "frameflicks-47a1c",
  storageBucket: "frameflicks-47a1c.firebasestorage.app",
  messagingSenderId: "949762271113",
  appId: "1:949762271113:web:32d7fbc58dc95bc837e358",
  measurementId: "G-9K6V1GYE0V",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
