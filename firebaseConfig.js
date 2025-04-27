// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAM8RK42HM0hGxucJygioYEdLHwwvTT1uY",
    authDomain: "locationsapp-94406.firebaseapp.com",
    projectId: "locationsapp-94406",
    storageBucket: "locationsapp-94406.firebasestorage.app",
    messagingSenderId: "909938554910",
    appId: "1:909938554910:web:ef9a397167df353d83960f"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };