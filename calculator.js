
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
let adding = false;
let addingOrSubtracting = false;
let multiplyingOrDividing = false;
let doneMultOrDiv = false;
let doneOrderOp = false;
let evaluating = false;
let operating = false;
let empty = true;
let posNeg = true;
let result = 0;
let selfOperate = 0;
let pemdas = values[values.length - 2];

const ultValue = values[values.length - 1];
const penultValue = values[values.length - 2];

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
};

const orderOp = () => {
  if (dividing) {
    result = divide(pemdas, values[values.length - 1]);
  } else if (multiplying) {
    result = multiply(pemdas, values[values.length - 1]);
  } else if (subtracting) {
    result = subtract(pemdas, values[values.length - 1]);
  } else if (adding) {
    result = add(pemdas, values[values.length - 1]);
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
};

const operateAfter = () => {
  if (dividing) {
    result = divide(pemdas, values[values.length - 1]);
  } else if (multiplying) {
    result = multiply(pemdas, values[values.length - 1]);
  } else if (subtracting) {
    result = subtract(pemdas, values[values.length - 1]);
  } else if (adding) {
    result = add(pemdas, values[values.length - 1]);
  } else {
    return values[values.length - 1];
  }
};

const evaluate = () => {
  evaluating = true;
  values.push(parseFloat(valueString));
  operate();
};

// Code ——————————————————————————————————

// Listening for "number" button clicks ——
// Includes code to limit decimals to 1 ——

for (let i = 0; i < numButtons.length; i++) {
  numButtons[i].addEventListener("click", function() {
    document.getElementById("clear").innerHTML = "C";
    operating = false;
    doneMultOrDiv = false;
    if (! consoleField.innerHTML.includes(".") || numButtons[i].innerHTML !== ".") {
      valueString += numButtons[i].innerHTML;
      consoleField.innerHTML = valueString;
    }
  });
}

// Listening for "control" button clicks —
for (let i = 0; i < controls.length; i++) {
  controls[i].addEventListener("click", function() {
    operating = true;
    // Empty case ————————————————————————
    if (consoleField.innerHTML === "0") {
      valueString = "0";
    }
    // Unless evaluating —————————————————
    if (evaluating === false) {
      values.push(parseFloat(valueString));
    }
    storeValue = parseFloat(valueString);
    valueString = "";
    if (controls[i].innerHTML === "÷") {
      if (addingOrSubtracting) {
        pemdas = values[values.length - 2];
        multiplyingOrDividing = true;
        operateAfter();
        dividing = true;
        multiplying = false;
        subtracting = false;
        adding = false;
        addingOrSubtracting = false;
      } else {
        if (values.length > 1 && evaluating === false) { operate(); }
        dividing = true;
        multiplying = false;
        subtracting = false;
        adding = false;
      }
    } else if (controls[i].innerHTML === "×") {
      if (addingOrSubtracting) {
        pemdas = values[values.length - 2];
        multiplyingOrDividing = true;
        operateAfter();
        dividing = false;
        multiplying = true;
        subtracting = false;
        adding = false;
        addingOrSubtracting = false;
      } else {
        if (values.length > 1 && evaluating === false) { operate(); }
        dividing = false;
        multiplying = true;
        subtracting = false;
        adding = false;
      }
    } else if (controls[i].innerHTML === "-") {
      addingOrSubtracting = true;
      breakSubtract = true;
      if (multiplyingOrDividing) {
        doneMultOrDiv = true;
      }
      if (values.length > 1 && evaluating === false) { operate(); }
      dividing = false;
      multiplying = false;
      subtracting = true;
      adding = false;
      multiplyingOrDividing = false;
      if (doneMultOrDiv) {
        if (breakAdd) {
          dividing = false;
          multiplying = false;
          subtracting = false;
          adding = true;
        }
        orderOp();
      }
    } else if (controls[i].innerHTML === "+") {
      addingOrSubtracting = true;
      breakAdd = true;
      if (multiplyingOrDividing) {
        doneMultOrDiv = true;
      }
      if (values.length > 1 && evaluating === false) { operate(); }
      dividing = false;
      multiplying = false;
      subtracting = false;
      adding = true;
      multiplyingOrDividing = false;
      if (doneMultOrDiv) {
        orderOp();
      }
    }
    evaluating = false;
    console.log(values);
    console.log(addingOrSubtracting, multiplyingOrDividing, doneMultOrDiv);
    // console.log(pemdas);
    // console.log(dividing, multiplying, subtracting, adding);
  });
}

// Listening for "result" button click ———
resultButton.addEventListener("click", function() {
  //ADD something to set multiplyingOrDividing to false
  evaluating = true;
  if (operating) {
    selfOperate = storeValue;
    values.push(selfOperate);
    operate();
  } else {
    evaluate();
  }
  console.log(values);
  console.log(addingOrSubtracting, multiplyingOrDividing);
});




























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
      console.log(Math.sign(values[values.length - 1]));
      console.log(values[values.length - 1]);
    } else if (special[i].innerHTML === "%") {
      console.log("tested percent");
    }
  });
}
