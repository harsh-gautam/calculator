const btns = document.querySelectorAll(".input-btn");
btns.forEach((btn) => {
  btn.addEventListener("click", handleBtnClick);
});
window.addEventListener("keydown", handleKeyboardInput);

let firstOperand = 0;
let secondOperand = 0;
let expression = "";
let operator = null;

const expressionDisplay = document.querySelector(".expression");
const resultDisplay = document.querySelector(".result");

function handleBtnClick(e) {
  if (e.target.textContent === "AC") {
    handleAC();
    return;
  }

  if (e.target.textContent === "C") {
    handleC();
    return;
  }

  if (e.target.textContent === "=") {
    handleEqual();
    return;
  }

  if (e.target.textContent === ".") {
    handleDot();
    return;
  }

  expression = expression.concat(e.target.textContent);

  // If pressed button is an operator
  if (!e.target.textContent.match(/[0-9]/g)) {
    if (firstOperand && operator) {
      secondOperand = resultDisplay.textContent;
      firstOperand = operate(firstOperand, secondOperand, operator);
      setOperation(e.target.textContent);
    } else if (expression === "") {
      // do nothing
    } else {
      firstOperand = resultDisplay.textContent;
      setOperation(e.target.textContent);
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
  if (operator === "+") return Number(firstOperand) + Number(secondOperand);
  if (operator === "-") return Number(firstOperand) - Number(secondOperand);
  if (operator === "×") return Number(firstOperand) * Number(secondOperand);
  if (operator === "÷") {
    return Number(secondOperand) === 0
      ? "MATH ERROR"
      : (Number(firstOperand) / Number(secondOperand)).toPrecision(4);
  }

  // Default Modulus Operation
  return Number(firstOperand) % Number(secondOperand);
}

function handleEqual() {
  if (firstOperand && operator) {
    secondOperand = resultDisplay.textContent;
    firstOperand = operate(firstOperand, secondOperand, operator);
    expressionDisplay.textContent = "";
    resultDisplay.textContent = firstOperand;
    secondOperand = 0;
    operator = null;
  }
}

function handleAC() {
  expressionDisplay.textContent = "";
  resultDisplay.textContent = 0;
  firstOperand = 0;
  secondOperand = 0;
  operator = null;
  expression = "";
}

function handleC() {
  if (resultDisplay.textContent.length < 2) {
    resultDisplay.textContent = "0";
    return;
  }
  resultDisplay.textContent = resultDisplay.textContent.slice(0, -1);
}

function handleDot() {
  if (resultDisplay.textContent === "") return;
  if (!resultDisplay.textContent.includes(".")) {
    resultDisplay.textContent += ".";
  } else return;
}

function handleKeyboardInput(e) {
  if (e.key >= 0 && e.key <= 9) {
    appendNumber(e.key);
  } else if (e.key === ".") {
    handleDot();
  } else if (e.key === "=" || e.key === "Enter") {
    e.preventDefault();
    handleEqual();
  } else if (e.key === "Backspace") {
    handleC();
  } else if (e.key === "Escape") {
    handleAC();
  } else if (e.key === "+" || e.key === "-" || e.key === "*" || e.key === "/") {
    if (firstOperand && operator) {
      secondOperand = resultDisplay.textContent;
      firstOperand = operate(firstOperand, secondOperand, operator);
      setOperation(convertOperator(e.key));
    } else {
      firstOperand = resultDisplay.textContent;
      setOperation(convertOperator(e.key));
    }
  }
}

function convertOperator(key) {
  if (key === "/") return "÷";
  if (key === "*") return "×";
  if (key === "-") return "-";

  // Default plus operator
  return "+";
}
