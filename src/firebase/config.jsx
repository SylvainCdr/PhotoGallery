// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import "firebase/compat/storage";
import "firebase/compat/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC9BTVPPiiJfp8FGXz-MAHe2VMlqPZQnFQ",
  authDomain: "photogallery-891ab.firebaseapp.com",
  projectId: "photogallery-891ab",
  storageBucket: "photogallery-891ab.appspot.com",
  messagingSenderId: "426092309136",
  appId: "1:426092309136:web:302cb545682c9a3ad54615"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Use storage and firestore instances from the app object
const projectStorage= firebase.storage();
const projectFirestore= firebase.firestore();
const timestamp = firebase.firestore.FieldValue.serverTimestamp;


export { projectStorage, projectFirestore, timestamp };