import {
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
} from "https://www.gstatic.com/firebasejs/9.20.0/firebase-auth.js";
import { auth } from "./main.js";

const logInSection = document.querySelectorAll("#login, #login-modal");
const modalJoinClub = document.getElementById("modal-join-club");
const logInWithGoogleButton = document.querySelectorAll(
  "#login-btn, #login-modal-btn"
);
const popup = document.getElementById("popup");
const closePopup = document.getElementById("close-popup");
const overlay = document.getElementById("overlay");
const loggedIn = document.getElementById("logged-in");
const loggedOut = document.getElementById("logged-out");

const signInWithGoogle = () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
    .then((response) => {
      // window.location.assign('./profile.html');
      console.log(response.user);
      popup.classList.add("open-popup");
      scroll(0, 0);
    })
    .catch((err) => {
      const errorMessage = err.message;
      return errorMessage ? alert("Popup closed") : alert("Popup on")
    });
};

logInWithGoogleButton.forEach((element) => {
  element.addEventListener("click", signInWithGoogle);
});

onAuthStateChanged(auth, (user) => {
  if (user != null) {
    console.log("User logat", user);
    overlay.classList.remove("active");
    logInSection.forEach((element) => {
      element.style.display = "none";
    });
    modalJoinClub.style.display = "none";
    closePopup.addEventListener("click", () => {
      popup.classList.remove("open-popup");
    });
    loggedOut.style.display = "none";
  } else {
    logInSection.forEach((element) => {
      element.style.display = "flex";
    });
  }
});
