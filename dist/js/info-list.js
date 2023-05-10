import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.20.0/firebase-auth.js";
import { auth, db } from "./main.js";
import {
  getFirestore,
  doc,
  setDoc,
  onSnapshot,
  collection,
  addDoc,
} from "https://www.gstatic.com/firebasejs/9.20.0/firebase-firestore.js";

const submitJoinBtn = document.getElementById("submit-join");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");
const plans = document.querySelectorAll(".plan-card");
const addons = document.querySelectorAll(".box");
const addonsSelected = document.querySelectorAll("#form-addons");
const bttnStepThree = document.getElementById("step-3");

const member = {
  plan: null,
  addons: "No addons",
  status: "Pending",
};

plans.forEach((plan) => {
  plan.addEventListener("click", () => {
    const planName = plan.querySelector("b");
    const planSelect =
      planName.innerText + " " + plan.querySelector(".plan-per").innerText;
    member.plan = planSelect;
  });
});

let allAddons = [];
submitJoinBtn
  ? submitJoinBtn.addEventListener("click", () => {
      addons.forEach((addon) => {
        if (addon.classList.contains("ad-selected")) {
          const addonSelect = addon.querySelector("label").innerText;
          allAddons.push(addonSelect);
        }
      });
    })
  : false;

member.addons = allAddons;

onAuthStateChanged(auth, (user) => {
  const submitJoin = async () => {
    let refCurrentUser = collection(db, `membersclub/${user.uid}/memberInfo`);

    const docRef = await addDoc(refCurrentUser, {
      name: nameInput.value,
      email: emailInput.value,
      phone: phoneInput.value,
      plan: member.plan,
      addons: member.addons,
      status: member.status,
    })
      .then(() => {
        alert("Successfully joining in the fitness club");
      })
      .catch((error) => {
        alert("nu merge..." + error);
      });
  };
  setTimeout(() => {
    submitJoinBtn.onclick = submitJoin;
  }, 1000);
});
