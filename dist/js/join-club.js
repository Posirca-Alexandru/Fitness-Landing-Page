import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.20.0/firebase-auth.js";
import { auth } from "./main.js";

const joinClub = document.getElementById("join-club");

const joinClubNow = () => {
  onAuthStateChanged(auth, (user) => {
    if (user != null) {
      console.log("User logat", user);
    } else {
      console.log("nelogat");
    }
  });
};

joinClub.addEventListener("click", joinClubNow);
