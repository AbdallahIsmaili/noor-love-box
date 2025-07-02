import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyBNOlZtHm4TxA9zoB-Ie2ErCQ-Z0Z5s-LM",
  authDomain: "noorgift-b4e94.firebaseapp.com",
  projectId: "noorgift-b4e94",
  storageBucket: "noorgift-b4e94.firebasestorage.app",
  messagingSenderId: "675426481777",
  appId: "1:675426481777:web:89fd30c5eacc82fd42cdd0",
  measurementId: "G-G4F2NQB00N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize Firestore
export const db = getFirestore(app)
export default app