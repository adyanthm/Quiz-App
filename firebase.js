import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDqvTznglQeHWes8eBKhGvUL4YLep9zHs4",
  authDomain: "aaradhyaquiz.firebaseapp.com",
  projectId: "aaradhyaquiz",
  storageBucket: "aaradhyaquiz.firebasestorage.app",
  messagingSenderId: "301116586723",
  appId: "1:301116586723:web:5f52e4e8bcc3352e7463d6",
  measurementId: "G-BLPHNVY2H6",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
