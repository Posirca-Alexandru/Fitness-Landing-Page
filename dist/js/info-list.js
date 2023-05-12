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
const selectedPlan = document.querySelector(".plan-basic");
const totalValue = document.querySelector(".total-value");

const member = {
  addons: "No addons",
  status_join: "Pending",
  plan: null,
  date_reg: null,
  time_reg: null,
  total_pay_$: null,
};

// plans.forEach((plan) => {
//   plan.addEventListener("click", () => {
//     const planName = plan.querySelector("b");
//     const planSelect =
//       planName.innerText + " " + plan.querySelector(".plan-per").innerText;
//     member.plan = planSelect;
//   });
// });

const updateDateTime = () => {
  const now = new Date();

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");

  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");

  const dateNow = `${day}-${month}-${year}`;
  const timeNow = `${hours}:${minutes}:${seconds}`;

  member.date_reg = dateNow;
  member.time_reg = timeNow;
};

let allAddons = [];
submitJoinBtn
  ? submitJoinBtn.addEventListener("click", () => {
      addons.forEach((addon) => {
        if (addon.classList.contains("ad-selected")) {
          const addonSelect = addon.querySelector("label").innerText;
          allAddons.push(addonSelect);
        }
      });

      const matchResult = totalValue.innerText.match(/\d+/);
      const valuePlan = matchResult ? matchResult[0] : "";

      member.total_pay_$ = valuePlan;
      member.plan = selectedPlan.innerText;
      updateDateTime();
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
      status_join: member.status_join,
      date_reg: member.date_reg,
      time_reg: member.time_reg,
      total_pay_$: member.total_pay_$,
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
