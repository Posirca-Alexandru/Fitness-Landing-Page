import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.20.0/firebase-auth.js";
import { auth } from "./main.js";

const logoutBtn = document.getElementById("logout");
const popup = document.getElementById("popup");
const loggedIn = document.getElementById("logged-in");
const loggedOut = document.getElementById("logged-out");
const closePopup = document.getElementById("close-popup");

console.log(loggedOut);
console.log(loggedIn);

const logoutWithGoogle = () => {
  auth
    .signOut()
    .then(() => {
      // window.location.assign('./profile.html');
      console.log("user logout");
      location.reload();
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
    popup.classList.add("open-popup");
    loggedIn.style.display = "none";
    loggedOut.style.display = "block";
    closePopup.addEventListener("click", () => {
      popup.classList.remove("open-popup");
      // window.location.reload();
      console.log(location.href)
    });
    if(window.location.reload === true) {
      popup.style.display = "none";
    }
  }
});
