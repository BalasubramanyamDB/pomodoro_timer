import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";

const app = initializeApp({
  apiKey: "AIzaSyDvwrQH3CzFzOtyottNWfsswB3Jv1RGpA4",
  authDomain: "buzz-6674e.firebaseapp.com",
  projectId: "buzz-6674e",
  storageBucket: "buzz-6674e.appspot.com",
  messagingSenderId: "335150684145",
  appId: "1:335150684145:web:b3138db8eb717e04609650"
});
export const provider = new GoogleAuthProvider();
export const auth = getAuth(app);
export default app;
