// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import * as firebase from "firebase/app";

// Add the Firebase services that you want to use
import "firebase/auth";
import "firebase/firestore";
// Initialize Firebase
var firebaseConfig = {
  apiKey: "AIzaSyCDMuhqUEyzaK30o3GrLf_KrQvpLkA6aGk",
  authDomain: "training-sep-2019.firebaseapp.com",
  databaseURL: "https://training-sep-2019.firebaseio.com",
  projectId: "training-sep-2019",
  storageBucket: "training-sep-2019.appspot.com",
  messagingSenderId: "130008270756"
};

firebase.initializeApp(firebaseConfig);

export default firebase;
