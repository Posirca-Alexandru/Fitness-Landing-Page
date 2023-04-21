import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.20.0/firebase-auth.js";
import { auth } from "./main.js";

const logoutBtn = document.getElementById("logout");

const logoutWithGoogle = () => {
  auth
    .signOut()
    .then(() => {
      // window.location.assign('./profile.html');
      console.log("user logout");
    })
    .catch((err) => {
      console.log(err);
    });
};

logoutBtn.addEventListener("click", logoutWithGoogle);

onAuthStateChanged(auth, (user) => {
  if (user != null) {
    logoutBtn.style.display = "block";
  } else {
    logoutBtn.style.display = "none";
  }
});
