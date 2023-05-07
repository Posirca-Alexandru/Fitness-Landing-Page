import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.20.0/firebase-auth.js";
import { auth } from "./main.js";

const logoutBtn = document.getElementById("logout");
const popup = document.getElementById("popup");
const loggedIn = document.getElementById("logged-in");
const loggedOut = document.getElementById("logged-out");

const logoutWithGoogle = () => {
  auth
    .signOut()
    .then((response) => {
      console.log(response);
      // window.location.assign('./profile.html');
      popup.classList.add("open-popup");
      confirm("Are you sure you want to log out?");
    })
    .catch((err) => {
      console.log(err);
    });
};

logoutBtn.addEventListener("click", logoutWithGoogle);

onAuthStateChanged(auth, (user) => {
  if (user != null) {
    logoutBtn.style.display = "block";
    loggedIn.style.display = "block";
  } else {
    logoutBtn.style.display = "none";
    loggedIn.style.display = "none";
    loggedOut.style.display = "block";
  }
});
