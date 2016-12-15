
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
let wasDividing = false;
let wasMultiplying = false;
let wasSubtracting = false;
let wasAdding = false;
let addingOrSubtracting = false;
let multiplyingOrDividing = false;
let doneMultOrDiv = false;
let evaluating = false;
let operating = false;
let breakDiv = false;
let breakMult = false;
let breakSubtract = false;
let breakAdd = false;
let breakPercent = true;
let breakNegate = false;
let breakEvaluate = false;
let ranPemdas = false;
let negating = false;
let percenting = false;
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
  negating = false;
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
    if (percenting) {
      valueString = "";
      percenting = false;
    }
    // new ————————————-

    // if (breakNegate) {
    //   console.log("crab");
    //   if (multiplyingOrDividing || addingOrSubtracting) {
    //     values.push(parseFloat(valueString));
    //     // valueString = "";
    //   }
    // }

    if (breakNegate) {
      evaluating = true;
    }

    // new above ———————
    if (addingOrSubtracting || multiplyingOrDividing) {
      if (negating) {
        breakNegate = true;
      }
    }
    if (!valueString.includes(".") || numButtons[i].innerHTML !== ".") {
      // Only thing not hard tested below —————————
      if (valueString === "0" && numButtons[i].innerHTML === "0") {
        valueString = "";
      }
      // Only thing not hard tested above —————————
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
    if (negating) {
      breakNegate = true;
    }
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
        if (percenting) {
          breakPercent = true;
        }
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
      if (percenting && values.length === 2) {
        values.pop();
      }

    // MULTIPLY BUTTON —————————————————————
    } else if (controls[i].innerHTML === "×") {
      breakMult = true;
      breakDiv = false;
      if (evaluating) {
        multiplyingOrDividing = true;
      }
      if (addingOrSubtracting) {
        if (percenting) {
          breakPercent = true;
        }
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
      if (percenting && values.length === 2) {
        values.pop();
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
      //added breakNegate line to fix
      // breakNegate = true;
    }
    evaluating = false;
    negating = false;
    console.log(values);
  });
}

// Listening for "result" button click ———
resultButton.addEventListener("click", function() {
  // or solves for empty case, and solves for everything else.
  // need to figure out which one is which
  // think fixed by adding not evaluating condition
  if (negating || breakNegate) {
    if (!evaluating) {
      values.pop();
    }
  }
  if (breakPercent) {
    ranPemdas = true;
  }
  evaluating = true;
  if (operating) {
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
      breakSubtract = false;
    }
    if (breakSubtract) {
      dividing = false;
      multiplying = false;
      subtracting = true;
      adding = false;
      breakAdd = false;
    }
    if (!ranPemdas || operating) {
      orderOp();
    } else {
      operateAfter();
    }
    if (breakPercent) {
      orderOp();
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
  percenting = false;
  breakDiv = false;
  breakMult = false;
  breakAdd = false;
  breakSubtract = false;
  breakPercent = false;
  breakNegate = false;
  breakEvaluate = false;
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
      valueString = "";
      values = [];
      consoleField.innerHTML = "0";
    } else if (special[i].innerHTML === "C") {
      valueString = "";
      consoleField.innerHTML = "0";
      special[i].innerHTML = "AC";
    } else if (special[i].innerHTML === "±" && consoleField.innerHTML !== "0") {
      if (operating) {
        valueString = values[values.length - 1].toString();
        if (!evaluating) {
          operating = false;
        }
      }
      if (evaluating) {
        breakEvaluate = true;
      }
      // added or not breakEvaluate
      if (values.length <= 1 || breakNegate || !breakEvaluate) {
        values.push(parseFloat(valueString));
      }
      values[values.length - 1] -= values[values.length - 1] * 2;
      consoleField.innerHTML = values[values.length - 1];
      negating = true;
      percenting = false;
      breakNegate = false;
      if (!breakEvaluate || negating) {
        if (!evaluating) {
          valueString = consoleField.innerHTML;
        }
      }
      breakEvaluate = false;
      if (negating) {
        breakEvaluate = true;
      }
    } else if (special[i].innerHTML === "%" && consoleField.innerHTML !== "0") {
      // new code to fixe self operate percenting
      // identical to beginning of negate button listener
      if (operating) {
        valueString = values[values.length - 1].toString();
        if (!evaluating) {
          operating = false;
        }
      }
      // end new code ———————————————————————————————————
      if (breakDiv || breakMult || breakAdd || breakSubtract) {
        if (dividing) {wasDividing = true;}
        if (multiplying) {wasMultiplying = true;}
        if (subtracting) {wasSubtracting = true;}
        if (adding) {wasAdding = true;}
        dividing = false;
        multiplying = true;
        values.push(parseFloat(valueString));
        values[values.length - 1] = values[values.length - 1] / 100;
        operate();
        consoleField.innerHTML = values[values.length - 1];
        valueString = consoleField.innerHTML;
        values.pop();
        if (percenting && breakPercent) {
          values.push(parseFloat(valueString));
          operate();
        }
        values.pop();
        if (percenting && breakPercent) {
          consoleField.innerHTML = values[values.length - 1];
          valueString = consoleField.innerHTML;
        }
        if (wasDividing) {
          dividing = true;
          multiplying = false;
          subtracting = false;
          adding = false;
        } else if (wasMultiplying) {
          dividing = false;
          multiplying = true;
          subtracting = false;
          adding = false;
        } else if (wasSubtracting) {
          dividing = false;
          multiplying = false;
          subtracting = true;
          adding = false;
        } else if (wasAdding) {
          dividing = false;
          multiplying = false;
          subtracting = false;
          adding = true;
        }
        wasDividing = false;
        wasMultiplying = false;
        wasSubtracting = false;
        wasAdding = false;
      } else {
        if (values.length < 1) {
          values.push(parseFloat(valueString));
        }
        values[values.length - 1] = values[values.length - 1] / 100;
        consoleField.innerHTML = values[values.length - 1];
      }
      percenting = true;
      // negating = false;
    }
    console.log(values);
  });
}
