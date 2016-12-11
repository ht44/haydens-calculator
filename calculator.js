
// Document selectors ————————————————————
const numButtons = document.querySelectorAll(".numBtns");
const consoleField = document.getElementById("console");
const controls = document.querySelectorAll(".contBtns");
const special = document.querySelectorAll(".specialBtns");
const resultButton = document.getElementById("equals");

// Variables —————————————————————————————
let values = [];
let storeValue = "";
let valueString = "";
let dividing = false;
let multiplying = false;
let subtracting = false;
let evaluating = false;
let adding = false;
let empty = true;
let result = 0;

// Functions —————————————————————————————
const divide = (numA, numB) => numA / numB;
const multiply = (numA, numB) => numA * numB;
const subtract = (numA, numB) => numA - numB;
const add = (numA, numB) => numA + numB;

const operate = () => {
  if (dividing) {
    result = divide(values[values.length - 2], values[values.length - 1]);
  } else if (multiplying) {
    result = multiply(values[values.length - 2], values[values.length - 1]);
  } else if (subtracting) {
    result = subtract(values[values.length - 2], values[values.length - 1]);
  } else if (adding) {
    result = add(values[values.length - 2], values[values.length - 1]);
  } else {
    return values[values.length - 1];
  }
  if (result !== Math.round(result)) {
    values.push(parseFloat(result.toFixed(2)));
    consoleField.innerHTML = (parseFloat(result.toFixed(2)));
  } else {
    values.push(parseFloat(result));
    consoleField.innerHTML = parseFloat(result);
  }
  console.log(values);
};

const operateEmpty = () => {
  if (dividing) {
    result = divide(0, values[values.length - 1]);
  } else if (multiplying) {
    result = multiply(0, values[values.length - 1]);
  } else if (subtracting) {
    result = subtract(0, values[values.length - 1]);
  } else if (adding) {
    result = add(0, values[values.length - 1]);
  }
  if (result !== Math.round(result)) {
    values.push(parseFloat(result.toFixed(2)));
    consoleField.innerHTML = (parseFloat(result.toFixed(2)));
  } else {
    values.push(parseFloat(result));
    consoleField.innerHTML = parseFloat(result);
  }
  console.log(values);
  empty = false;
};

const evaluate = () => {
  evaluating = true;
  values.push(parseFloat(valueString));
  operate();
};

const whichOperate = () => {
  if (empty) { operateEmpty(); }
  else { operate(); }
};

// Code ——————————————————————————————————

// Listening for "number" button clicks ——
// Includes code to limit decimals to 1 ——

for (let i = 0; i < numButtons.length; i++) {
  numButtons[i].addEventListener("click", function() {
    document.getElementById("clear").innerHTML = "C";
    if (! consoleField.innerHTML.includes(".") || numButtons[i].innerHTML !== ".") {
      valueString += numButtons[i].innerHTML;
      consoleField.innerHTML = valueString;
    }
  });
}

// Listening for "control" button clicks —
for (let i = 0; i < controls.length; i++) {
  controls[i].addEventListener("click", function() {
    if (consoleField.innerHTML === "0") {
      valueString = "0";
    }
    if (evaluating === false) {
      values.push(parseFloat(valueString));
    }
    storeValue = parseFloat(valueString);
    valueString = "";
    if (controls[i].innerHTML === "÷") {
      if (values.length > 1 && evaluating === false) { operate(); }
      dividing = true;
      multiplying = false;
      subtracting = false;
      adding = false;
    } else if (controls[i].innerHTML === "×") {
      if (values.length > 1 && evaluating === false) { operate(); }
      dividing = false;
      multiplying = true;
      subtracting = false;
      adding = false;
    } else if (controls[i].innerHTML === "-") {
      if (values.length > 1 && evaluating === false) { operate(); }
      dividing = false;
      multiplying = false;
      subtracting = true;
      adding = false;
    } else if (controls[i].innerHTML === "+") {
      if (values.length > 1 && evaluating === false) { operate(); }
      dividing = false;
      multiplying = false;
      subtracting = false;
      adding = true;
    }
    evaluating = false;
    console.log(values);
  });
}

// Listening for "special" button clicks —
for (let i = 0; i < special.length; i++) {
  special[i].addEventListener("click", function() {
    if (special[i].innerHTML === "AC") {
      dividing = false;
      multiplying = false;
      subtracting = false;
      adding = false;
      evaluating = false;
    } else if (special[i].innerHTML === "C") {
      valueString = "";
      consoleField.innerHTML = "0";
      special[i].innerHTML = "AC";
    } else if (special[i].innerHTML === "±") {
      console.log("tested negate");
    } else if (special[i].innerHTML === "%") {
      console.log("tested percent");
    }
  });
}

// Listening for "result" button click ———
resultButton.addEventListener("click", function() {
  evaluate();
});
