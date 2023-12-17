import firebase from "firebase/compat/app";
// Import the functions you need from the SDKs you need
import "firebase/compat/database";
import "firebase/compat/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  // apiKey: "AIzaSyCdTWx1LWQ2Ihu_IM_t2yYc0HqanZpMEd4",
  // authDomain: "uploadimgtofirebase-8d5c9.firebaseapp.com",
  // projectId: "uploadimgtofirebase-8d5c9",
  // storageBucket: "uploadimgtofirebase-8d5c9.appspot.com",
  // messagingSenderId: "939682945824",
  // appId: "1:939682945824:web:319cfb0102d58890b95545"

  // apiKey: "AIzaSyD2RavRVHO56Iw-0jefnNMGro1Gg9y8xyE",
  // authDomain: "uploadimg-d0873.firebaseapp.com",
  // projectId: "uploadimg-d0873",
  // storageBucket: "uploadimg-d0873.appspot.com",
  // messagingSenderId: "1078795630642",
  // appId: "1:1078795630642:web:b9e3e56074909140bc242b",
  // measurementId: "G-JLZWZPKM29",

  apiKey: "AIzaSyCg73yqCNCIvWFRy6utbW6sqMN_s11RdnQ",
  authDomain: "imgbuyzzle.firebaseapp.com",
  projectId: "imgbuyzzle",
  storageBucket: "imgbuyzzle.appspot.com",
  messagingSenderId: "1071792430918",
  appId: "1:1071792430918:web:8def05f877525f88fccf47",
  measurementId: "G-ESM5WMGJ2R",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const storage = firebase.storage();
export default firebase;
