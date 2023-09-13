import firebase from 'firebase/compat/app';
// Import the functions you need from the SDKs you need
import "firebase/compat/database";
import 'firebase/compat/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCdTWx1LWQ2Ihu_IM_t2yYc0HqanZpMEd4",
  authDomain: "uploadimgtofirebase-8d5c9.firebaseapp.com",
  projectId: "uploadimgtofirebase-8d5c9",
  storageBucket: "uploadimgtofirebase-8d5c9.appspot.com",
  messagingSenderId: "939682945824",
  appId: "1:939682945824:web:319cfb0102d58890b95545"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const storage = firebase.storage()
export default firebase;