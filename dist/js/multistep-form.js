const steps = document.querySelectorAll(".stp");
const circleSteps = document.querySelectorAll(".step");
const formInputs = document.querySelectorAll(".step-1 form input");
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
      console.log(currentStep + ' step steps');
      document.querySelector(`.step-${currentStep}`).style.display = "flex";
      circleSteps[currentCircle].classList.remove("active");
      currentCircle--;
      console.log(currentCircle + ' circle steps');
    });
}
nextBtn.addEventListener("click", () => {
    document.querySelector(`.step-${currentStep}`).style.display = "none";
    if (currentStep < 5 && validateForm()) {
        currentStep++;
        console.log(currentStep + ' step');
        currentCircle++;
        console.log(currentCircle + ' circle');
    //   setTotal();
    }
    document.querySelector(`.step-${currentStep}`).style.display = "flex";
    circleSteps[currentCircle].classList.add("active");
    // summary(obj);
  });
});

// const summary = (obj) => {
//   const planName = document.querySelector(".plan-name");
//   const planPrice = document.querySelector(".plan-price");
//   planPrice.innerHTML = `${obj.price.innerText}`;
//   planName.innerHTML = `${obj.plan.innerText} (${
//     obj.kind ? "yearly" : "monthly"
//   })`;
// };

const validateForm = () => {
  let valid = true;
  for (let i = 0; i < formInputs.length; i++) {
    if (!formInputs[i].value) {
        valid = false;
        formInputs[i].classList.add("error");
        findLabel(formInputs[i]).nextElementSibling.style.display = "flex";
    } else {
        valid = true;
        formInputs[i].classList.remove("error");
        findLabel(formInputs[i]).nextElementSibling.style.display = "none";
    }
  }
  return valid;
};

const findLabel = (el) => {
  const idVal = el.id;
  const labels = document.getElementsByTagName("label");
  for (let i = 0; i < labels.length; i++) {
    if (labels[i].htmlFor == idVal) return labels[i];
  }
};

plans.forEach((plan) => {
    plan.addEventListener('click', () => {
        document.querySelector('.selected').classList.remove('selected');
        plan.classList.add('selected');
        const planName = plan.querySelector('b');
        const planPrice = plan.querySelector('.plan-priced');
        obj.plan = planName;
        obj.price = planPrice;
    });
})