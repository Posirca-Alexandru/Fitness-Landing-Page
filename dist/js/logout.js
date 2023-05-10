import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.20.0/firebase-auth.js";
import { auth } from "./main.js";

const logoutBtn = document.getElementById("logout");
const popup = document.getElementById("popup");
const loggedIn = document.getElementById("logged-in");
const loggedOut = document.getElementById("logged-out");

const logoutWithGoogle = () => {
  if (confirm("Are you sure you want to log out?") == true) {
    auth
      .signOut()
      .then(() => {
        // window.location.assign('./profile.html');
        scroll(0, 0);
        popup.classList.add("open-popup");
        console.log("User logged out successfully");
      })
      .catch((err) => {
        console.log(err);
      });
  }
};

logoutBtn.addEventListener("click", logoutWithGoogle);

onAuthStateChanged(auth, (user) => {
  user != null
    ? ((logoutBtn.style.display = "block"), (loggedIn.style.display = "block"))
    : ((logoutBtn.style.display = "none"),
      (loggedIn.style.display = "none"),
      (loggedOut.style.display = "block"));
});
