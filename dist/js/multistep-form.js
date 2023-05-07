const steps = document.querySelectorAll(".stp");
const circleSteps = document.querySelectorAll(".step");
const formInputs = document.querySelectorAll(".step-1 form input");
const phoneError = document.getElementById("phone-error");
const emailError = document.getElementById("email-error");
const nameError = document.getElementById("name-error");
const valuesInputs = document.querySelectorAll("#name, #email, #phone");
const bttnDisable = document.getElementById("bttn-step-1");
const plans = document.querySelectorAll(".plan-card");
const switcher = document.querySelector(".switch");
const addons = document.querySelectorAll(".box");
const total = document.querySelector(".total b");
const planPrice = document.querySelector(".plan-price");
let time;
let currentStep = 1;
let currentCircle = 0;
const obj = {
  plan: null,
  kind: null,
  price: null,
};

steps.forEach((step) => {
  const nextBtn = step.querySelector(".next-stp");
  const prevBtn = step.querySelector(".prev-stp");
  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      document.querySelector(`.step-${currentStep}`).style.display = "none";
      currentStep--;
      console.log(currentStep + " step steps");
      document.querySelector(`.step-${currentStep}`).style.display = "flex";
      circleSteps[currentCircle].classList.remove("active");
      currentCircle--;
      console.log(currentCircle + " circle steps");
    });
  }
  nextBtn.addEventListener("click", () => {
    document.querySelector(`.step-${currentStep}`).style.display = "none";
    if (currentStep < 5) {
      currentStep++;
      console.log(currentStep + " step");
      currentCircle++;
      console.log(currentCircle + " circle");
      setTotal();
    }
    document.querySelector(`.step-${currentStep}`).style.display = "flex";
    circleSteps[currentCircle].classList.add("active");
    summary(obj);
  });
});

const checkDisable = () => {
  valuesInputs.forEach((input) => {
    input.addEventListener("keyup", () => {
      const value = input.value;
      if (
        value === "" ||
        phoneError.style.display == "block" ||
        nameError.style.display == "block" ||
        emailError.style.display == "block"
      ) {
        bttnDisable.disabled = true;
      } else {
        bttnDisable.disabled = false;
      }
    });
  });
};
checkDisable();

const validateForm = () => {
  const nameField = document.getElementById("name");
  const emailField = document.getElementById("email");
  const phoneField = document.getElementById("phone");
  const nameError = document.getElementById("name-error");
  const emailError = document.getElementById("email-error");
  const phoneError = document.getElementById("phone-error");

  valuesInputs.forEach((input) => {
    input.addEventListener("keyup", (key) => {
      const valueInput = input.value;
      if (input == emailField) {
        if (
          !valueInput.match(/^[A-Za-z\._\-0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/)
        ) {
          emailError.style.display = "block";
          if (valueInput == null || valueInput == "") {
            emailError.style.display = "none";
            return false;
          }
          return false;
        }
        emailError.style.display = "none";
      } else if (input == nameField) {
        if (
          !valueInput.match(/^[A-Z]+[a-zA-Z_ ]*$/) ||
          valueInput.match(/^\s*$/)
        ) {
          nameError.style.display = "block";
          if (valueInput == null || valueInput == "") {
            nameError.style.display = "none";
            return false;
          }
          return false;
        }
        nameError.style.display = "none";
      } else if (input == phoneField) {
        if (
          !valueInput.match(
            /^(?:(?:(?:00\s?|\+)40\s?|0)(?:7\d{2}\s?\d{3}\s?\d{3}|(21|31)\d{1}\s?\d{3}\s?\d{3}|((2|3)[3-7]\d{1})\s?\d{3}\s?\d{3}|(8|9)0\d{1}\s?\d{3}\s?\d{3}))$/
          )
        ) {
          phoneError.style.display = "block";
          if (valueInput == null || valueInput == "") {
            phoneError.style.display = "none";
            return false;
          }
          return false;
        }
        phoneError.style.display = "none";
      }
      return true;
    });
  });
};

validateForm();

// const validateForm = () => {
//   let valid = true;
//   for (let i = 0; i < formInputs.length; i++) {
//     if (!formInputs[i].value) {
//       valid = false;
//       formInputs[i].classList.add("error");
//       findLabel(formInputs[i]).nextElementSibling.style.display = "flex";
//     } else {
//       valid = true;
//       formInputs[i].classList.remove("error");
//       findLabel(formInputs[i]).nextElementSibling.style.display = "none";
//     }
//   }
//   return valid;
// };

const findLabel = (el) => {
  const idVal = el.id;
  const labels = document.getElementsByTagName("label");
  for (let i = 0; i < labels.length; i++) {
    if (labels[i].htmlFor == idVal) return labels[i];
  }
};

plans.forEach((plan) => {
  plan.addEventListener("click", () => {
    document.querySelector(".selected").classList.remove("selected");
    plan.classList.add("selected");
    const planName = plan.querySelector("b");
    const planPrice = plan.querySelector(".plan-priced");
    obj.plan = planName;
    obj.price = planPrice;
  });
});

switcher.addEventListener("click", () => {
  const val = switcher.querySelector("input").checked;
  if (val) {
    document.querySelector(".monthly").classList.remove("sw-active");
    document.querySelector(".yearly").classList.add("sw-active");
  } else {
    document.querySelector(".monthly").classList.add("sw-active");
    document.querySelector(".yearly").classList.remove("sw-active");
  }
  switchPrice(val);
  obj.kind = val;
});

addons.forEach((addon) => {
  addon.addEventListener("click", (e) => {
    const addonSelect = addon.querySelector("input");
    const ID = addon.getAttribute("data-id");
    if (addonSelect.checked) {
      addonSelect.checked = false;
      addon.classList.remove("ad-selected");
      showAddon(ID, false);
    } else {
      addonSelect.checked = true;
      addon.classList.add("ad-selected");
      showAddon(addon, true);
      e.preventDefault();
    }
  });
});

const switchPrice = (checked) => {
  const yearlyPrice = [90, 120, 150];
  const monthlyPrice = [9, 12, 15];
  const prices = document.querySelectorAll(".plan-priced");
  if (checked) {
    prices[0].innerHTML = `$${yearlyPrice[0]}/yr`;
    prices[1].innerHTML = `$${yearlyPrice[1]}/yr`;
    prices[2].innerHTML = `$${yearlyPrice[2]}/yr`;
    setTime(true);
  } else {
    prices[0].innerHTML = `$${monthlyPrice[0]}/mo`;
    prices[1].innerHTML = `$${monthlyPrice[1]}/mo`;
    prices[2].innerHTML = `$${monthlyPrice[2]}/mo`;
    setTime(false);
  }
};

const showAddon = (ad, val) => {
  const temp = document.getElementsByTagName("template")[0];
  const clone = temp.content.cloneNode(true);
  const serviceName = clone.querySelector(".service-name");
  const servicePrice = clone.querySelector(".service-price");
  const serviceID = clone.querySelector(".selected-addon");
  if (ad && val) {
    serviceName.innerText = ad.querySelector("label").innerText;
    servicePrice.innerText = ad.querySelector(".price").innerText;
    serviceID.setAttribute("data-id", ad.dataset.id);
    document.querySelector(".addons").appendChild(clone);
  } else {
    const addons = document.querySelectorAll(".selected-addon");
    addons.forEach((addon) => {
      const attr = addon.getAttribute("data-id");
      if (attr == ad) {
        addon.remove();
      }
    });
  }
};

const summary = (obj) => {
  const planName = document.querySelector(".plan-name");
  const planPrice = document.querySelector(".plan-price");
  planPrice.innerHTML = `${obj.price.innerText}`;
  planName.innerHTML = `${obj.plan.innerText} (${
    obj.kind ? "yearly" : "monthly"
  })`;
};

const setTotal = () => {
  const str = planPrice.innerHTML;
  const res = str.replace(/\D/g, "");
  const addonPrices = document.querySelectorAll(
    ".selected-addon .service-price"
  );
  let val = 0;
  for (let i = 0; i < addonPrices.length; i++) {
    const str = addonPrices[i].innerHTML;
    const res = str.replace(/\D/g, "");
    val += Number(res);
  }
  total.innerHTML = `$${val + Number(res)}/${time ? "yr" : "mo"}`;
};

const setTime = (t) => {
  return (time = t);
};