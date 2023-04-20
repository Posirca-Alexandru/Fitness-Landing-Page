import { initializeApp } from "https://www.gstatic.com/firebasejs/9.20.0/firebase-app.js";
// import { auth } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-auth.js";
import {
  getAuth,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/9.20.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyCtq_X2AQEZQQwMQJ2XawGp3OgZzW3MQ2I",
  authDomain: "fitness-landing-page-332e0.firebaseapp.com",
  projectId: "fitness-landing-page-332e0",
  storageBucket: "fitness-landing-page-332e0.appspot.com",
  messagingSenderId: "913531159836",
  appId: "1:913531159836:web:37ad61fb0b1ec74930e6d9",
  measurementId: "G-K5J9JWY2Q3",
};

const app = initializeApp(firebaseConfig);
const logoutBtn = document.getElementById("logout");
const joinClub = document.getElementById("join-club");

export const auth = getAuth(app);
// const db = getFirestore(app);

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
  }
});

const joinClubNow = () => {
  onAuthStateChanged(auth, (user) => {
    if (user != null) {
      console.log("User logat", user);
    } else {
      console.log("nelogat")
    }
  })
};

joinClub.addEventListener("click", joinClubNow);
