// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyBsBFpYLnMyfJv8SzYzKEf62dIwOp4qk8I",
//   authDomain: "event-management-b5f16.firebaseapp.com",
//   databaseURL: "https://event-management-b5f16-default-rtdb.asia-southeast1.firebasedatabase.app",
//   projectId: "event-management-b5f16",
//   storageBucket: "event-management-b5f16.firebasestorage.app",
//   messagingSenderId: "777325040227",
//   appId: "1:777325040227:web:78f0ca75bc03fa13661e56",
//   measurementId: "G-WT6S7B0ZVK"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// export { firebaseConfig, app };


// Import Firebase modules
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBsBFpYLnMyfJv8SzYzKEf62dIwOp4qk8I",
  authDomain: "event-management-b5f16.firebaseapp.com",
  databaseURL: "https://event-management-b5f16-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "event-management-b5f16",
  storageBucket: "event-management-b5f16.firebasestorage.app",
  messagingSenderId: "777325040227",
  appId: "1:777325040227:web:78f0ca75bc03fa13661e56",
  measurementId: "G-WT6S7B0ZVK"
};


const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
// Initialize Firebase
// const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

// Initialize Analytics with error handling
let analytics;
try {
  analytics = getAnalytics(app);
} catch (error) {
  console.warn("Analytics initialization failed:", error);
}

export { db, storage, auth, analytics };