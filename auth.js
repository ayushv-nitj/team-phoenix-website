// auth.js
import { auth } from "./firebaseConfig.js";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

// Signup
function signUp(email, password) {
  createUserWithEmailAndPassword(auth, email, password)
    .then(userCred => {
      console.log("Signed Up:", userCred.user);
      // Redirect to dashboard
    })
    .catch(err => console.error("Signup Error", err));
}

// Login
function login(email, password) {
  signInWithEmailAndPassword(auth, email, password)
    .then(userCred => {
      console.log("Logged In:", userCred.user);
      // Redirect to dashboard
    })
    .catch(err => console.error("Login Error", err));
}
