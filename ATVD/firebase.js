import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

// COLAR AQUI A STRING DE CONEXÃO
const firebaseConfig = {
   apiKey: "AIzaSyAvNqNEIV-YA5carXxbnpo8TySkdrvWDGc",
  authDomain: "atvd-64daa.firebaseapp.com",
  projectId: "atvd-64daa",
  storageBucket: "atvd-64daa.firebasestorage.app",
  messagingSenderId: "180712992009",
  appId: "1:180712992009:web:71cfb4a20b7d344c02b7d8"
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