import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDqvTznglQeHWes8eBKhGvUL4YLep9zHs4",
  authDomain: "aaradhyaquiz.firebaseapp.com",
  projectId: "aaradhyaquiz",
  storageBucket: "aaradhyaquiz.firebasestorage.app",
  messagingSenderId: "301116586723",
  appId: "1:301116586723:web:5f52e4e8bcc3352e7463d6",
  measurementId: "G-BLPHNVY2H6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const names = [
  "Luna",
  "Atlas",
  "Nova",
  "Orion",
  "Stella",
  "Phoenix",
  "Lyra",
  "Cosmos",
  "Aurora",
  "Zenith",
  "Nebula",
  "Astro",
  "Celeste",
  "Galaxy",
  "Jupiter",
  "Mars",
  "Venus",
  "Mercury",
  "Saturn",
  "Neptune",
  "Pluto",
  "Comet",
  "Star",
  "Moon",
  "Sun",
  "Eclipse",
  "Meteor",
  "Cosmic",
  "Infinity",
  "Quantum",
  "Vector",
  "Matrix",
  "Binary",
  "Cyber",
  "Digital",
  "Pixel",
  "Data",
  "Code",
  "Alpha",
  "Beta",
  "Delta",
  "Gamma",
  "Omega",
  "Sigma",
  "Theta",
  "Lambda",
  "Epsilon",
  "Zeta",
  "Kappa",
  "Omicron",
];

async function seedDatabase() {
  try {
    for (let i = 0; i < names.length; i++) {
      const score = Math.floor(Math.random() * 10); // Random score between 0-10
      const accuracy = Math.floor(Math.random() * (100 - 40) + 40); // Random accuracy between 40-100%

      const nickname = `${names[i]}_${Math.floor(Math.random() * 100)}`; // Add random number to ensure uniqueness

      await setDoc(doc(db, "leaderboard", nickname), {
        nickname,
        score,
        accuracy,
        timestamp: new Date(),
      });

      console.log(
        `Added user: ${nickname} with score: ${score} and accuracy: ${accuracy}%`
      );
    }
    console.log("Database seeding completed!");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
}

// Run the seeding
seedDatabase();
