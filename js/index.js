const btns = document.querySelectorAll(".input-btn");
btns.forEach((btn) => {
  btn.addEventListener("click", handleBtnClick);
});

let num1 = 0;
let num2 = 0;
let result = 0;
let expression = "";
let operator;

function handleBtnClick(e) {
  expression = expression.concat(e.target.textContent);
  const expressionDisplay = document.querySelector(".expression");
  const resultDisplay = document.querySelector(".result");

  if (e.target.textContent === "=") {
    if (num1) {
      num2 = resultDisplay.textContent;
      num1 = operate(num1, num2, operator);
      expressionDisplay.textContent = "";
      expression = num1.toString();
      resultDisplay.textContent = num1;
      num2 = 0;
      operator = "";
      return;
    }
  }

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
      return;
    }
    console.log("Storing in num1");
    num1 = resultDisplay.textContent;
    operator = expression[expression.length - 1];
    expressionDisplay.textContent = expression;
    expression = "";
  } else {
    console.log("Got a number");
    resultDisplay.textContent = e.target.textContent;
  }

  // console.log(expression);
}

function operate(num1, num2, operator) {
  if (operator === "+") return parseFloat(num1) + parseFloat(num2);
  if (operator === "-") return num1 - num2;
  if (operator === "x") return num1 * num2;
  if (operator === "/") return num1 / num2;
  if (operator === "%") return num1 % num2;
}
