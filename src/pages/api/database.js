import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBkoStxyHZi6ETgWIPrQSZ-8HUWj5k8duE",
  authDomain: "myflappy-ff54b.firebaseapp.com",
  projectId: "myflappy-ff54b",
  storageBucket: "myflappy-ff54b.appspot.com",
  messagingSenderId: "885592574763",
  appId: "1:885592574763:web:622084aafcb517f0c2536e",
  measurementId: "G-YZTGET83FR"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export const leaderboardTable = "leaderboard";
export default db;

