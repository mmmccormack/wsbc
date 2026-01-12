// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDBkWHwvti8CVooEKRZAno9NSIRRqy3JMQ",
    authDomain: "west-side-baseball-club-b9921.firebaseapp.com",
    projectId: "west-side-baseball-club-b9921",
    storageBucket: "west-side-baseball-club-b9921.appspot.com",
    messagingSenderId: "167176217443",
    appId: "1:167176217443:web:1cb69cd0f4e8bcc8bc2956"
};

// Initialize Firebase
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { app, getDatabase, database, ref, get };