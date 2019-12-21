import firebase from "firebase";

// API credentials
var firebaseConfig = {
  apiKey: "AIzaSyCAVy5tcA_8BF7PBaJ-ZNkQYUKr-_xyuaE",
  authDomain: "check-list-60e66.firebaseapp.com",
  databaseURL: "https://check-list-60e66.firebaseio.com",
  projectId: "check-list-60e66",
  storageBucket: "check-list-60e66.appspot.com",
  messagingSenderId: "436061024828",
  appId: "1:436061024828:web:60afb1a5b5d321320ec939"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

// export const auth = firebase.auth();
export const fs = app.firestore();
export const auth = app.auth();

// export const an = firebase.analytics();

// export const st = app.storage();