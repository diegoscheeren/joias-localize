import firebase from 'firebase'

const config = {
    apiKey: "AIzaSyDo8Z2xnSNZ9KxcJ_scPRhLuBi71XOn1wo",
    authDomain: "localizepzo.firebaseapp.com",
    databaseURL: "https://localizepzo.firebaseio.com",
    projectId: "localizepzo",
    storageBucket: "localizepzo.appspot.com",
    messagingSenderId: "366286297760",
    appId: "1:366286297760:web:c86c4e61c1496b6c1a47c5",
    measurementId: "G-XWEZ689FSV"
};

const ia = firebase.initializeApp(config);
const db = firebase.firestore();
const fb = firebase.database();
firebase.analytics();

export {ia, fb, db}
