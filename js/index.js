const btns = document.querySelectorAll(".input-btn");
btns.forEach((btn) => {
  btn.addEventListener("click", handleBtnClick);
});
window.addEventListener("keydown", handleKeyboardInput);

let firstOperand = 0;
let secondOperand = 0;
let expression = "";
let operator;

const expressionDisplay = document.querySelector(".expression");
const resultDisplay = document.querySelector(".result");

function handleBtnClick(e) {
  if (e.target.textContent === "AC") {
    handleAC(expressionDisplay, resultDisplay);
    return;
  }

  if (e.target.textContent === "C") {
    handleC(resultDisplay);
    return;
  }

  if (e.target.textContent === "=") {
    handleEqual();
    return;
  }

  if (e.target.textContent === ".") {
    handleDot(resultDisplay);
    return;
  }

  expression = expression.concat(e.target.textContent);

  // If pressed button is an operator
  if (!e.target.textContent.match(/[0-9]/g)) {
    if (firstOperand && operator) {
      secondOperand = resultDisplay.textContent;
      firstOperand = operate(firstOperand, secondOperand, operator);
      setOperation(e.target.textContent);
      // updateDisplay();
    } else if (expression === "") {
      // do nothing
    } else {
      firstOperand = resultDisplay.textContent;
      setOperation(e.target.textContent);
      // updateDisplay();
    }
  } else {
    appendNumber(e.target.textContent);
  }
}

function appendNumber(num) {
  if (resultDisplay.textContent !== "0") resultDisplay.textContent += num;
  else resultDisplay.textContent = num;
}

function updateDisplay() {
  expressionDisplay.textContent = `${firstOperand} ${operator}`;
  resultDisplay.textContent = 0;
}

function setOperation(op) {
  operator = op;
  updateDisplay();
}

function operate(firstOperand, secondOperand, operator) {
  firstOperand = Number(firstOperand);
  secondOperand = Number(secondOperand);
  if (operator === "+") return firstOperand + secondOperand;
  if (operator === "-") return firstOperand - secondOperand;
  if (operator === "×") return firstOperand * secondOperand;
  if (operator === "÷") {
    if (secondOperand === "0") {
      return "MATH ERROR";
    } else {
      return (firstOperand / secondOperand).toPrecision(4);
    }
  }
  if (operator === "%") return firstOperand % secondOperand;
}

function handleEqual() {
  if (firstOperand && operator) {
    secondOperand = resultDisplay.textContent;
    firstOperand = operate(firstOperand, secondOperand, operator);
    expressionDisplay.textContent = "";
    expression = firstOperand.toString();
    resultDisplay.textContent = firstOperand;
    secondOperand = 0;
    operator = "";
  } else return;
}

function handleAC(expressionDisplay, resultDisplay) {
  expressionDisplay.textContent = "";
  resultDisplay.textContent = 0;
  firstOperand = 0;
  secondOperand = 0;
  operator = "";
  expression = "";
}

function handleC() {
  if (resultDisplay.textContent.length < 2) {
    resultDisplay.textContent = "0";
    return;
  }
  truncatedText = resultDisplay.textContent.slice(0, -1);
  resultDisplay.textContent = truncatedText;
}

function handleDot(resultDisplay) {
  if (resultDisplay.textContent === "") return;
  if (!resultDisplay.textContent.includes(".")) {
    resultDisplay.textContent += ".";
  } else return;
}

function handleKeyboardInput(e) {
  if (e.key >= 0 && e.key <= 9) appendNumber(e.key);
  if (e.key === ".") handleDot();
  if (e.key === "=" || e.key === "Enter") handleEqual();
  if (e.key === "Backspace") handleC();
  if (e.key === "Escape") handleAC();
  if (e.key === "+" || e.key === "-" || e.key === "*" || e.key === "/") {
    console.log(e.key);
    if (firstOperand && operator) {
      console.log("If");
      secondOperand = resultDisplay.textContent;
      firstOperand = operate(firstOperand, secondOperand, operator);
      setOperation(convertOperator(e.key));
    } else if (expression === "") {
      // do nothing
    } else {
      console.log("Else");
      firstOperand = resultDisplay.textContent;
      setOperation(convertOperator(e.key));
    }
  }
}

function convertOperator(key) {
  if (key === "/") return "÷";
  if (key === "*") return "×";
  if (key === "-") return "-";
  if (key === "+") return "+";
}
