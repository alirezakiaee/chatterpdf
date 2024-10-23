import { getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyAJT7oe7-TmK8JrsQ-WduC44c1jtOHd7V4",
    authDomain: "chatter-pdf.firebaseapp.com",
    projectId: "chatter-pdf",
    storageBucket: "chatter-pdf.appspot.com",
    messagingSenderId: "250298564712",
    appId: "1:250298564712:web:d9e0bf9e6946c2789e3bdd",
    measurementId: "G-7RV24X7EGL"
  };

  const app = getApps()?.length ? getApps()[0] : initializeApp(firebaseConfig);
  export const db = getFirestore(app);
  export const storage = getStorage(app);