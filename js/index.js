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

  expression = expression.concat(e.target.textContent);

  if (!e.target.textContent.match(/[0-9]/g)) {
    if (num1 && operator) {
      num2 = resultDisplay.textContent;
      console.log("num1 exists storing in num2, num2 -> ", num2);

      num1 = operate(num1, num2, operator);
      console.log("Operated num1 changed, num1 -> ", num1);

      operator = expression[expression.length - 1];
      expression = num1 + operator;

      console.log("Expression changed --> ", expression);
      expressionDisplay.textContent = expression;
      resultDisplay.textContent = 0;
      return;
    } else if (expression === "") return;
    console.log("Storing in num1");
    num1 = resultDisplay.textContent;
    operator = expression[expression.length - 1];
    expressionDisplay.textContent = expression;
    resultDisplay.textContent = 0;
    expression = "";
  } else {
    console.log("Got a number");
    if (resultDisplay.textContent !== "0")
      resultDisplay.textContent += e.target.textContent;
    else resultDisplay.textContent = e.target.textContent;
  }

  // console.log(expression);
}

function operate(num1, num2, operator) {
  if (operator === "+") return parseFloat(num1) + parseFloat(num2);
  if (operator === "-") return num1 - num2;
  if (operator === "×") return num1 * num2;
  if (operator === "÷") return num1 / num2;
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
