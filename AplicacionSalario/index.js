const steps = document.querySelectorAll(".stp");
const circleSteps = document.querySelectorAll(".step");
const plans = document.querySelectorAll(".plan-card");

let currentStep = 1;
let currentCircle = 0;

const obj = {
  cantidad: null,
};

// Test: console.log("true");

//-------------Configuracion de los botones--------------
steps.forEach((step) => {
  const nextBtn = step.querySelector(".next-stp");
  const prevBtn = step.querySelector(".prev-stp");

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      goToStep(currentStep - 1);
    });
  }

  nextBtn.addEventListener("click", () => {
    const cantidad = obj.cantidad;

    if (validatePlan()) {
      if (currentStep < steps.length && validateForm()) {
        goToStep(currentStep + 1);

        //console.log("current step:" + currentStep);

        if (currentStep === 2) {
          cloneForm(cantidad);
        }

        if (currentStep === 3) {
          addEmpleado();
          addhrsExtra(clonedForms);
          addTotalSalario(clonedForms, cantidad);
        }
      }
    }
  });
});

//-------------Funcion que verifica que todos los campos esten llenos----------
function validateForm() {
  let valid = true;

  clonedForms.forEach((form) => {
    const formInputs = form.querySelectorAll("input");

    formInputs.forEach((input) => {
      if (!input.value) {
        valid = false;
        input.classList.add("err");
        findLabel(input).nextElementSibling.style.display = "flex";
      } else {
        valid = true;
        input.classList.remove("err");
        findLabel(input).nextElementSibling.style.display = "none";
      }
    });
  });

  return valid;
}
//------------Funcion que encuentra el label id de cada campo----------------
function findLabel(el) {
  const idVal = el.id;
  const labels = document.getElementsByTagName("label");
  for (let i = 0; i < labels.length; i++) {
    if (labels[i].htmlFor == idVal) return labels[i];
  }
}

//-----------------Configuracion de los circulos/pasos del multi form -------
function goToStep(step) {
  for (let i = 0; i < steps.length; i++) {
    circleSteps[i].classList.remove("active");
  }

  steps[currentStep - 1].style.display = "none";
  currentStep = step;

  for (let i = 0; i < currentStep; i++) {
    circleSteps[i].classList.add("active");
  }

  steps[currentStep - 1].style.display = "flex";
}

//-----------PASO 1----------------

plans.forEach((plan) => {
  plan.addEventListener("click", () => {
    if (document.querySelector(".selected")) {
      document.querySelector(".selected").classList.remove("selected");
    }
    if (!plan.classList.contains("selected")) {
      plan.classList.add("selected");
    }

    const planCantidad = plan.querySelector(".plan-cantidad ");
    obj.cantidad = planCantidad.textContent;
    // test:console.log(obj.cantidad);
  });
});

function validatePlan() {
  const selectedPlan = document.querySelector(".selected");

  if (!selectedPlan) {
    alert("Porfavor, elija una cantidad.");
    return false;
  }

  const planCantidad = selectedPlan.querySelector(".plan-cantidad ");
  obj.cantidad = planCantidad.textContent;

  // test:console.log(obj.cantidad);
  return true;
}

//-----------PASO 2----------------
let clonedForms = [];

function cloneForm(cantidad) {
  console.log(cantidad);

  const originalForm = document.querySelector("#form-layout form");
  const formContainer = document.getElementById("form-layout");
  const divider = document.querySelector(".divider");

  clonedForms = [];

  while (formContainer.firstChild) {
    formContainer.removeChild(formContainer.firstChild);
  }

  for (let i = 1; i <= cantidad; i++) {
    if (cantidad == 1) {
      divider.style.display = "none";
    } else {
      divider.style.display = "flex";
    }

    if (cantidad == 3 && i == 3) {
      divider.style.display = "none";
    }

    if (cantidad == 5 && i == 5) {
      divider.style.display = "none";
    }

    const clonedForm = originalForm.cloneNode(true);
    const uniqueId = `form${i}`;
    clonedForm.id = uniqueId;

    formContainer.appendChild(clonedForm);
    clonedForms.push(clonedForm);
  }
}

function calcOrnato(salaryValue) {
  let ornatoValue = 0;

  if (salaryValue >= 501 && salaryValue <= 1000) {
    ornatoValue = 10;
  } else if (salaryValue >= 1001 && salaryValue <= 3000) {
    ornatoValue = 15;
  } else if (salaryValue >= 3001 && salaryValue <= 6000) {
    ornatoValue = 50;
  } else if (salaryValue >= 6001 && salaryValue <= 9000) {
    ornatoValue = 75;
  } else if (salaryValue >= 9001 && salaryValue <= 12000) {
    ornatoValue = 100;
  } else if (salaryValue <= 12001) {
    ornatoValue = 150;
  } else {
    ornatoValue = 4;
  }
  console.log(ornatoValue);

  return ornatoValue;
}

function calcSAR(salaryValue, BonusValue) {
  let sarValue = 0;
  let iggs = 4.83;

  const Iggs = ((salaryValue * iggs) / 100).toFixed(2);

  sarValue = salaryValue - Iggs + BonusValue;

  console.log(sarValue);
  return sarValue;
}

function addEmpleado() {
  const empleadosTable = document.querySelector(".empleados-table");

  while (empleadosTable.firstChild) {
    empleadosTable.removeChild(empleadosTable.firstChild);
  }

  for (let i = 0; i < clonedForms.length; i++) {
    const newRow = document.createElement("tr");
    newRow.classList.add("empleados");

    const salaryInput = clonedForms[i].querySelector("#salario");
    const salaryValue = parseFloat(salaryInput.value);

    const ornatoValue = calcOrnato(salaryValue);

    const bonusInput = clonedForms[i].querySelector("#bonus");
    const bonusValue = parseFloat(bonusInput.value);

    const sarValue = calcSAR(salaryValue, bonusValue);

    const inputs = clonedForms[i].querySelectorAll("input");

    inputs.forEach((input) => {
      const newCell = document.createElement("td");
      newCell.textContent = input.value;
      newRow.appendChild(newCell);
    });

    const ornatoCell = document.createElement("td");
    ornatoCell.textContent = ornatoValue;
    newRow.appendChild(ornatoCell);

    const sarCell = document.createElement("td");
    sarCell.textContent = sarValue;
    newRow.appendChild(sarCell);

    empleadosTable.appendChild(newRow);
  }
}

//------------PASO 3------------------
function addhrsExtra(clonedForms) {
  let totalHoursEx = 0;

  for (let i = 0; i < clonedForms.length; i++) {
    const hrsInput = clonedForms[i].querySelector("#horasEX");
    const hrsValue = parseFloat(hrsInput.value);

    if (!isNaN(hrsValue)) {
      totalHoursEx += hrsValue;
    }
  }

  const hourRow = document.querySelector(".total-tr-1");

  if (hourRow) {
    const HrsCell = hourRow.querySelector("#total-td-1");
    HrsCell.textContent = totalHoursEx;
  }
}

function addTotalSalario(clonedForms, cantidad) {
  let totalSal = 0;
  let totalProm = 0;

  for (let i = 0; i < clonedForms.length; i++) {
    const salaryInput = clonedForms[i].querySelector("#salario");
    const salaryValue = parseFloat(salaryInput.value);

    const bonusInput = clonedForms[i].querySelector("#bonus");
    const bonusValue = parseFloat(bonusInput.value);

    const sarValue = calcSAR(salaryValue, bonusValue);

    if (!isNaN(sarValue)) {
      totalSal += sarValue;
    }
  }
  const totalRow = document.querySelector(".total-tr-3");

  if (totalRow) {
    const totalCell = totalRow.querySelector("#total-td-3");
    totalCell.textContent = totalSal;
  }

  console.log(cantidad);

  if (!isNaN(totalSal)) {
    totalProm = (totalSal / cantidad).toFixed(2);
  }

  const promRow = document.querySelector(".total-tr-2");

  if (promRow) {
    const promCell = promRow.querySelector("#total-td-2");
    promCell.textContent = totalProm;
  }
}

//---------PASO 4 ------------------

let refreshBtn = document.querySelector(".refresh-stp");

refreshBtn.addEventListener("click", refreshPage);

function refreshPage() {
  location.reload();
}
