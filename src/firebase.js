import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, EmailAuthProvider, GoogleAuthProvider } from 'firebase/auth';
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDeYzg9BOoYHD3G6WyqQw-ucVpSAyiR3Pk",
    authDomain: "g-docs-clone-ccffe.firebaseapp.com",
    projectId: "g-docs-clone-ccffe",
    storageBucket: "g-docs-clone-ccffe.appspot.com",
    messagingSenderId: "896846345289",
    appId: "1:896846345289:web:0764d80dc2d77db4977b98"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { db, auth, storage, EmailAuthProvider, GoogleAuthProvider };