import { initializeApp } from "https://www.gstatic.com/firebasejs/12.18.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.18.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDC8whRHX6lksU5mZ26TYMggtIlhbENUUA",
  authDomain: "vozes-senai.firebaseapp.com",
  projectId: "vozes-senai",
  storageBucket: "vozes-senai.firebasestorage.app",
  messagingSenderId: "301159495654",
  appId: "1:301159495654:web:c4d09083b3f10877e34827",
  measurementId: "G-CYZSNGB5JX",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };
