import { boot } from 'quasar/wrappers';

// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore, Timestamp } from 'firebase/firestore';

// Firebase Bruno
const firebaseConfig = {
  apiKey: 'AIzaSyDOq_uqpZyTl7EFEQUeCJ0jGcXUAjUdu6k',
  authDomain: 'empreiteiro-7bb4d.firebaseapp.com',
  projectId: 'empreiteiro-7bb4d',
  storageBucket: 'empreiteiro-7bb4d.appspot.com',
  messagingSenderId: '741108522148',
  appId: '1:741108522148:web:8e69f82c35fe211408da31',
  measurementId: 'G-HFKY27ES97',
};

//// Firebase Luiz
// const firebaseConfig = {
//   apiKey: 'AIzaSyDOq_uqpZyTl7EFEQUeCJ0jGcXUAjUdu6k',
//   authDomain: 'empreiteiro-7bb4d.firebaseapp.com',
//   projectId: 'empreiteiro-7bb4d',
//   storageBucket: 'empreiteiro-7bb4d.appspot.com',
//   messagingSenderId: '741108522148',
//   appId: '1:741108522148:web:8e69f82c35fe211408da31',
//   measurementId: 'G-HFKY27ES97',
// };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Inicializa a autenticação
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Inicializa banco de dados
const db = getFirestore(app);

export default boot(async (/* { app, router, ... } */) => {
  // something to do
});

export { db, auth, provider, Timestamp };
