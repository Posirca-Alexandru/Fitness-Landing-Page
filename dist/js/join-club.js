import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.20.0/firebase-auth.js";
import { auth } from "./main.js";

const openModalBtn = document.querySelectorAll("[data-modal-target]");
const closeModalBtn = document.querySelectorAll("[data-close-button]");
const overlay = document.getElementById("overlay");
const popup = document.getElementById("popup");

openModalBtn.forEach((button) => {
  onAuthStateChanged(auth, (user) => {
    if (user != null) {
      button.addEventListener("click", () => {
        const modalJoin = document.querySelector("#form");
        openModalJoin(modalJoin);
        if (modalJoin.classList.contains("active")) {
          popup.classList.remove("open-popup");
        }
      });
    } else {
      console.log("nelogat");
      button.addEventListener("click", () => {
        const modalJoin = document.querySelector(button.dataset.modalTarget);
        openModalJoin(modalJoin);
      });
    }
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
  const modals = document.querySelectorAll(
    ".modal-join-club.active, .form.active"
  );
  modals.forEach((modalJoin) => {
    closeModalJoin(modalJoin);
  });
});

closeModalBtn.forEach((button) => {
  onAuthStateChanged(auth, (user) => {
    if (user != null) {
      button.addEventListener("click", () => {
        const modalJoin = document.querySelector("#form");
        closeModalJoin(modalJoin);
      });
    } else {
      console.log("logout succesfull");
      button.addEventListener("click", () => {
        const modalJoin = document.querySelector("#modal-join-club");
        closeModalJoin(modalJoin);
      });
    }
  });
});

// closeModalBtn.forEach((button) => {
//   button.addEventListener("click", (modalJoin) => {
//     if(modalJoin.id = "form") {
//       const modalJoin = button.closest(".form");
//       closeModalJoin(modalJoin)
//     } else if(modalJoin.id = "modal-join-club") {
//       const modalJoin = button.closest(".modal-join-club");
//       closeModalJoin(modalJoin);
//       console.log(modalJoin.id)
//     }
//   });
// });
