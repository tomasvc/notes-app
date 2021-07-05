import firebase from 'firebase'

firebase.initializeApp({
    apiKey: "AIzaSyD2FAWgHdsPSyDT9MHKjLhz5VQf_13hwI4",
    authDomain: "notes-441a3.firebaseapp.com",
    projectId: "notes-441a3",
    storageBucket: "notes-441a3.appspot.com",
    messagingSenderId: "399430406358",
    appId: "1:399430406358:web:6770b7463320fb57477977",
    measurementId: "G-ZGKH7BJZTX"
  })
  
  export const auth = firebase.auth();
  export const db = firebase.firestore();