
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
let breakDiv = false;
let breakMult = false;
let breakSubtract = false;
let breakAdd = false;
let empty = true;
let posNeg = true;
let ranPemdas = false;
let result = 0;
let selfOperate = 0;
let pemdas = values[values.length - 2];

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
    if (evaluating) {
      valueString = "";
      evaluating = false;
    }
    if (!valueString.includes(".") || numButtons[i].innerHTML !== ".") {
      if (valueString === "" && numButtons[i].innerHTML === ".") {
        valueString = "0";
      }
      valueString += numButtons[i].innerHTML;
      consoleField.innerHTML = valueString;
    }
  });
}

// Listening for "control" button clicks —
for (let i = 0; i < controls.length; i++) {
  controls[i].addEventListener("click", function() {
    // operating = true;
    // Empty case ————————————————————————
    if (consoleField.innerHTML === "0") {
      valueString = "0";
    }
    // Unless evaluating —————————————————
    if (evaluating === false && !operating) {
      values.push(parseFloat(valueString));
    }
    if (!operating) {
      storeValue = parseFloat(valueString);
      valueString = "";
    }
    // DIVIDE BUTTON ——————————————————————
    if (controls[i].innerHTML === "÷") {
      breakDiv = true;
      breakMult = false;
      if (evaluating) {
        multiplyingOrDividing = true;
      }
      if (addingOrSubtracting) {
        pemdas = values[values.length - 2];
        multiplyingOrDividing = true;
        if (!operating) {
          operateAfter();
        }
        dividing = true;
        multiplying = false;
        subtracting = false;
        adding = false;
        addingOrSubtracting = false;
      } else {
        if (values.length > 1 && evaluating === false) {
          if (!operating) {
            operate();
          }
        }
        dividing = true;
        multiplying = false;
        subtracting = false;
        adding = false;
      }
      if (operating) {
        multiplyingOrDividing = false;
      }

    // MULTIPLY BUTTON —————————————————————
    } else if (controls[i].innerHTML === "×") {
      breakMult = true;
      breakDiv = false;
      if (evaluating) {
        multiplyingOrDividing = true;
      }
      if (addingOrSubtracting) {
        pemdas = values[values.length - 2];
        multiplyingOrDividing = true;
        if (!operating) {
          operateAfter();
        }
        dividing = false;
        multiplying = true;
        subtracting = false;
        adding = false;
        addingOrSubtracting = false;
      } else {
        if (values.length > 1 && evaluating === false) {
          if (!operating) {
            operate();
          }
        }
        dividing = false;
        multiplying = true;
        subtracting = false;
        adding = false;
      }
      if (operating) {
        multiplyingOrDividing = false;
      }

    // SUBTRACT BUTTON ——————————————————————
    } else if (controls[i].innerHTML === "-") {
      addingOrSubtracting = true;
      breakSubtract = true;
      breakMult = false;
      breakDiv = false;
      if (multiplyingOrDividing) {
        doneMultOrDiv = true;
      }
      if (values.length > 1 && evaluating === false) {
        if (!operating) {
          operate();
        }
      }
      dividing = false;
      multiplying = false;
      subtracting = true;
      adding = false;
      multiplyingOrDividing = false;
      if (doneMultOrDiv) {
        if (breakAdd) {
          subtracting = false;
          adding = true;
          breakAdd = false;
        }
        if (!operating) {
          orderOp();
        }
        subtracting = true;
        adding = false;
      }

    // ADD BUTTON ———————————————————————————
    } else if (controls[i].innerHTML === "+") {
      addingOrSubtracting = true;
      breakAdd = true;
      breakMult = false;
      breakDiv = false;
      if (multiplyingOrDividing) {
        doneMultOrDiv = true;
      }
      if (values.length > 1 && evaluating === false) {
        if (!operating) {
          operate();
        }
      }
      dividing = false;
      multiplying = false;
      subtracting = false;
      adding = true;
      multiplyingOrDividing = false;
      if (doneMultOrDiv) {
        if (breakSubtract) {
          subtracting = true;
          adding = false;
          breakSubtract = false;
        }
        if (!operating) {
          orderOp();
        }
        subtracting = false;
        adding = true;
      }
    }
    storeValue = values[values.length -1];
    operating = true;
    ranPemdas = false;
    if (evaluating) {
      ranPemdas = true;
    }
    evaluating = false;
    console.log(values);
    // console.log(pemdas);
    // console.log(dividing, multiplying, subtracting, adding);
  });
}

// Listening for "result" button click ———
resultButton.addEventListener("click", function() {
  evaluating = true;
  if (operating) {
    console.log(storeValue);
    selfOperate = storeValue;
    values.push(selfOperate);
    operate();
    doneMultOrDiv = false;
  } else {
    evaluate();
  }
  if (multiplyingOrDividing && !operating) {
      doneMultOrDiv = true;
  }
  if (doneMultOrDiv) {
    if (breakAdd) {
      dividing = false;
      multiplying = false;
      subtracting = false;
      adding = true;
    }
    if (breakSubtract) {
      dividing = false;
      multiplying = false;
      subtracting = true;
      adding = false;
    }
    console.log(ranPemdas, operating);
    if (!ranPemdas || operating) {
      console.log("orderOp");
      orderOp();
    } else {
      console.log("operateAfter");
      operateAfter();
    }
    if (breakDiv) {
      dividing = true;
      multiplying = false;
      subtracting = false;
      adding = false;
      breakDiv = false;
    }
    if (breakMult) {
      dividing = false;
      multiplying = true;
      subtracting = false;
      adding = false;
      breakMult = false;
    }
    ranPemdas = true;
  }
  doneMultOrDiv = false;
  multiplyingOrDividing = false;
  // valueString = "";
  console.log(values);
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
      if (values.length < 1) {
        values.push(parseFloat(valueString));
      }
      values[values.length - 1] -= values[values.length - 1] * 2;
      consoleField.innerHTML = values[values.length - 1];
      console.log(values);
    } else if (special[i].innerHTML === "%") {
      console.log("tested percent");
    }
  });
}
