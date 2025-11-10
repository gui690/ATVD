import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

// COLAR AQUI A STRING DE CONEXÃO
const firebaseConfig = {
    apiKey: "AIzaSyBHFLS18jZClIxvSRoSJdWdiObQHXbFMns",
    authDomain: "info-d456c.firebaseapp.com",
    projectId: "info-d456c",
    storageBucket: "info-d456c.firebasestorage.app",
    messagingSenderId: "1090234968570",
    appId: "1:1090234968570:web:3e0afb890003377b739c43",
    measurementId: "G-V4SZZFZZMC"
};
  
  
// INICIALIZAR O FIREBASE
let app;
if (firebase.apps.length == 0) {
    app = firebase.initializeApp(firebaseConfig);
} else {
    app = firebase.app();
}

const auth = firebase.auth();
const firestore = firebase.firestore();
const storage = firebase.storage();
export { auth, firestore, storage };