import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.20.0/firebase-auth.js";
import { auth } from "./main.js";

const joinClub = document.getElementById("join-club");
const openModalBtn = document.querySelectorAll("[data-modal-target]");
const closeModalBtn = document.querySelectorAll("[data-close-button]");
const overlay = document.getElementById("overlay");

openModalBtn.forEach((button) => {
  button.addEventListener("click", () => {
    const modalJoin = document.querySelector(button.dataset.modalTarget);
    openModalJoin(modalJoin);
  });
});

const openModalJoin = (modalJoin) => {
  if (modalJoin == null) return;
  modalJoin.classList.add("active");
  overlay.classList.add("active");
};

const closeModalJoin = (modalJoin) => {
  if (modalJoin == null) return;
  modalJoin.classList.remove("active");
  overlay.classList.remove("active");
};

overlay.addEventListener("click", () => {
  const modals = document.querySelectorAll(".modal-join-club.active");
  modals.forEach((modalJoin) => {
    closeModalJoin(modalJoin);
  });
});

closeModalBtn.forEach((button) => {
  button.addEventListener("click", () => {
    const modalJoin = button.closest(".modal-join-club");
    closeModalJoin(modalJoin);
  });
});

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
