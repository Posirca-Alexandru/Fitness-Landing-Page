import {onAuthStateChanged, signInWithPopup, GoogleAuthProvider} from "https://www.gstatic.com/firebasejs/9.20.0/firebase-auth.js";

import { auth } from "./main.js";

const logInSection = document.getElementById("login");
const logInWithGoogleButton = document.getElementById("login-btn");


const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
    .then((response) => {
        // window.location.assign('./profile.html');
        console.log(response.user)
        alert('merge')
    })
    .catch(err => {
        const errorCode = err.code;
        const errorMessage = err.message;
        // The email of the user's account used.
        const email = err.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(err);
        alert(errorMessage);
    })
}

logInWithGoogleButton.addEventListener('click', signInWithGoogle)

onAuthStateChanged(auth, (user) => {
  if (user != null) {
    console.log("User logat", user);
    logInSection.style.display = "none";
  } else {
    logInSection.style.display = "block";
  }
});
