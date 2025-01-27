import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCXAzz1QIMEhV-g6dk1HyycE2PEDHgFB10",
  authDomain: "ejercicio2-dfcf8.firebaseapp.com",
  projectId: "ejercicio2-dfcf8",
  storageBucket: "ejercicio2-dfcf8.appspot.com",
  messagingSenderId: "107917177809",
  appId: "1:107917177809:web:04623ad7a8e44e2927e6f0"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
