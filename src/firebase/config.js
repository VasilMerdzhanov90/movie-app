import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js'
import { getFirestore, Timestamp, doc, setDoc, collection, addDoc, getDocs } from 'https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js'

const firebaseConfig = {
    apiKey: "AIzaSyCAECgvtSURnmGmqgorc9ynH63niNoH0Z0",
    authDomain: "movie-app-ba9f8.firebaseapp.com",
    databaseURL: "https://movie-app-ba9f8-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "movie-app-ba9f8",
    storageBucket: "movie-app-ba9f8.appspot.com",
    messagingSenderId: "662740384141",
    appId: "1:662740384141:web:c8a3dfb6f54d82d04ae5c4"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();

export {
    db,
    auth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    doc,
    setDoc,
    collection,
    getDocs,
    addDoc,
    Timestamp
}