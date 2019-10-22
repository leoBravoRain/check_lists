// import firebase from "firebase/app";
import firebase from "firebase";
import "firebase/firestore";

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyA_tbQqUAGK0CVCgYW6ilmmnRlH2r_nON4",
    authDomain: "check-lists-693dc.firebaseapp.com",
    databaseURL: "https://check-lists-693dc.firebaseio.com",
    projectId: "check-lists-693dc",
    storageBucket: "check-lists-693dc.appspot.com",
    messagingSenderId: "1001920658249",
    appId: "1:1001920658249:web:756f36e5e312e7312b7898",
    measurementId: "G-5J4J1JWBH3"
};

// initialize firebase
app = firebase.initializeApp(firebaseConfig);

// export firestore
export const fs = app.firestore();