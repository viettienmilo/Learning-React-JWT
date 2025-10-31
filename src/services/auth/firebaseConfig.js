// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyBYxvt8ABffTlRFlzLF02Ot19HYAbE4q6o",
    authDomain: "learn-react-jwt.firebaseapp.com",
    projectId: "learn-react-jwt",
    appId: "1:836238809821:web:87e0d1bcbc9bab30f2d934",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);