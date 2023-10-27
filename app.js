const display = document.getElementById("current-operation");
const buttons = document.querySelectorAll("#buttons-container button");

//Initial Values
let currentNumber = "";
let firstOperand = null;
let operator = null;

//Function updateScreen:
function updateScreen() {
  display.innerText = currentNumber;
}

function addDigit(digit) {
  //prevent more than 1 decimal dot.
  if (digit === "." && currentNumber.includes(".")) {
    return;
  }
  //otherwise display at screen:
  currentNumber += digit;
  updateScreen();
}

// Loop buttons
buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const value = btn.innerText;
    //check if is a number or dot. (means not a operator)
    if (+value >= 0 || value === ".") {
      addDigit(value);
    } else if (
      value === "+" ||
      value === "-" ||
      value === "*" ||
      value === "/"
    ) {
      //Not perform calculator, its empty or missing some of data.
      if (currentNumber !== "") {
        if (firstOperand === null) {
          firstOperand = currentNumber;
          operator = value;
          currentNumber = "";
        }
      } else {
        // Perform calculation when two numbers and an operator are present
        const display = calculate(firstOperand, currentNumber, operator);
        currentNumber = display.toString();
        firstOperand = currentNumber;
        operator = value;
        updateScreen();
      }
    } else if (value === "=") {
      if (firstOperand !== null) {
        const display = calculate(firstOperand, currentNumber, operator);
        currentNumber = display.toString();
        firstOperand = null;
        operator = null;
        updateScreen();
      }
    //Clear field buttons
    } else if (value === "CE") {
      //Clear the current input
      currentNumber = "";
      updateScreen();
    } else if (value === "C") {
      //Clear all
      currentNumber = "";
      firstOperand = null;
      operator = null;
      updateScreen();
    } else if (value === "DEL") {
      //Remove the last character from the input
      currentNumber = currentNumber.slice(0, -1);
      updateScreen();
    }
  });
});

//Calculation function (with parameteres)
function calculate(num1, num2, operator) {
  num1 = parseFloat(num1);
  num2 = parseFloat(num2);

  //switch operators
  switch (operator) {
    case "+":
      return num1 + num2;
      break;
    case "-":
      return num1 - num2;
      break;
    case "*":
      return num1 * num2;
      break;
    case "/":
      return num1 / num2;
      break;
    default:
      return;
  }
}
