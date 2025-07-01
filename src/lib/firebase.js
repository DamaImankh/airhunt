import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCfxd0GbzzDpb5aAdfkCLPpKHpL3dOq7Wc",
    authDomain: "airhunt-527ae.firebaseapp.com",
    projectId: "airhunt-527ae",
    storageBucket: "airhunt-527ae.appspot.com",
    messagingSenderId: "131895485194",
    appId: "1:131895485194:ios:63c5b93f86d36a071850f3"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// Utility function to check if user is logged in
export const checkAuth = () =>
    new Promise((resolve) => {
        onAuthStateChanged(auth, (user) => {
            resolve(user);
        });
    });