const btns = document.querySelectorAll(".input-btn");
btns.forEach((btn) => {
  btn.addEventListener("click", handleBtnClick);
});

let num1 = 0;
let num2 = 0;
let expression = "";
let operator;

function handleBtnClick(e) {
  const expressionDisplay = document.querySelector(".expression");
  const resultDisplay = document.querySelector(".result");

  if (e.target.textContent === "AC") {
    handleAC(expressionDisplay, resultDisplay);
    return;
  }

  if (e.target.textContent === "C") {
    handleC(resultDisplay);
    return;
  }

  if (e.target.textContent === "=") {
    if (num1 && operator) {
      num2 = resultDisplay.textContent;
      num1 = operate(num1, num2, operator);
      expressionDisplay.textContent = "";
      expression = num1.toString();
      resultDisplay.textContent = num1;
      num2 = 0;
      operator = "";
      return;
    } else return;
  }

  if (e.target.textContent === ".") {
    handleDot(resultDisplay);
    return;
  }

  expression = expression.concat(e.target.textContent);

  if (!e.target.textContent.match(/[0-9]/g)) {
    if (num1 && operator) {
      num2 = resultDisplay.textContent;

      num1 = operate(num1, num2, operator);

      operator = expression[expression.length - 1];
      expression = num1 + operator;

      expressionDisplay.textContent = expression;
      resultDisplay.textContent = 0;
      return;
    } else if (expression === "") return;

    num1 = resultDisplay.textContent;
    operator = expression[expression.length - 1];
    expressionDisplay.textContent = expression;
    resultDisplay.textContent = 0;
    expression = "";
  } else {
    if (resultDisplay.textContent !== "0")
      resultDisplay.textContent += e.target.textContent;
    else resultDisplay.textContent = e.target.textContent;
  }
}

function operate(num1, num2, operator) {
  num1 = Number(num1);
  num2 = Number(num2);
  if (operator === "+") return num1 + num2;
  if (operator === "-") return num1 - num2;
  if (operator === "×") return num1 * num2;
  if (operator === "÷") {
    if (num2 === "0") {
      return "MATH ERROR";
    } else {
      return (num1 / num2).toPrecision(4);
    }
  }
  if (operator === "%") return num1 % num2;
}

function handleAC(expressionDisplay, resultDisplay) {
  expressionDisplay.textContent = "";
  resultDisplay.textContent = 0;
  num1 = 0;
  num2 = 0;
  operator = "";
  expression = "";
}

function handleC(resultDisplay) {
  expression = expression.slice(0, -1);
  if (resultDisplay.textContent.length < 2) {
    resultDisplay.textContent = "0";
    return;
  }
  truncatedText = resultDisplay.textContent.slice(0, -1);
  resultDisplay.textContent = truncatedText;
}

function handleDot(resultDisplay) {
  if (resultDisplay.textContent === "") return;
  // console.log(resultDisplay.textContent.search("."));
  // if (resultDisplay.textContent.search(".") === -1) {
  //   resultDisplay.textContent += ".";
  // } else return;
}
