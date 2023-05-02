import {onAuthStateChanged, signInWithPopup, GoogleAuthProvider} from "https://www.gstatic.com/firebasejs/9.20.0/firebase-auth.js";
import { auth } from "./main.js";

const logInSection = document.querySelectorAll("#login, #login-modal");
const modalJoinClub = document.querySelectorAll("#modal-join-club, #overlay");
const logInWithGoogleButton = document.querySelectorAll("#login-btn, #login-modal-btn");
const popup = document.getElementById('popup');
const closePopup = document.getElementById('close-popup');

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

logInWithGoogleButton.forEach((element) => {
  element.addEventListener('click', signInWithGoogle);
})

onAuthStateChanged(auth, user => {
  if (user != null) {
    console.log("User logat", user);
    logInSection.forEach((element) => {
      element.style.display = "none";
    });
    modalJoinClub.forEach((element) => {
      element.style.display = "none";
    });
    popup.classList.add("open-popup");
    closePopup.addEventListener('click', () => {
      popup.classList.remove("open-popup");
    })
  } else {
    logInSection.forEach((element) => {
      element.style.display = "flex";
    })
  }
});
