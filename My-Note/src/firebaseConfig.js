import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBulDrmfJHxWPdnQy8Qd9ACBvhld-oaZJA",
  authDomain: "my-notes-67dde.firebaseapp.com",
  projectId: "my-notes-67dde",
  storageBucket: "my-notes-67dde.firebasestorage.app",
  messagingSenderId: "860109259266",
  appId: "1:860109259266:web:81cae03a85f0ebcb1a1d1b"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
