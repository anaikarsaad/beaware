// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAstdwwoIgu6wERo61RdIXCmn14ehYC4mc",
  authDomain: "beaware-5e054.firebaseapp.com",
  projectId: "beaware-5e054",
  storageBucket: "beaware-5e054.appspot.com",
  messagingSenderId: "841847274082",
  appId: "1:841847274082:web:ee296a91e377dedd66af3b",
  measurementId: "G-NRNT6N21LJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);