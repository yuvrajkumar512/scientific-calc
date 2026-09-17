const display = document.getElementById("display");
const history = document.getElementById("history");

let currentExpression = "0";

function updateDisplay() {
  display.textContent = currentExpression;
}

function append(value) {
  if (currentExpression === "0" && value !== ".") {
    currentExpression = value;
  } else {
    currentExpression += value;
  }
  updateDisplay();
}

function clearDisplay() {
  currentExpression = "0";
  updateDisplay();
}

function deleteChar() {
  if (currentExpression.length > 1) {
    currentExpression = currentExpression.slice(0, -1);
  } else {
    currentExpression = "0";
  }
  updateDisplay();
}

function calculate() {
  let expr = currentExpression;

  // Replace ^ with ** for exponentiation
  expr = expr.replace(/\^/g, "**");

  // Replace trigonometric functions and convert degrees to radians
  expr = expr.replace(/(sin|cos|tan)\(([^)]+)\)/g, (match, func, arg) => {
    return `Math.${func}(${arg} * Math.PI / 180)`;
  });

  // Replace log with Math.log10 and ln with Math.log
  expr = expr.replace(/log\(([^)]+)\)/g, "Math.log10($1)");
  expr = expr.replace(/ln\(([^)]+)\)/g, "Math.log($1)");

  // Replace pi with Math.PI and e with Math.E
  expr = expr.replace(/pi/g, "Math.PI");
  expr = expr.replace(/e/g, "Math.E");

  try {
    const result = eval(expr);
    currentExpression = result;
    updateDisplay();
    addToHistory(expr, result);
  } catch (e) {
    currentExpression = "Error";
    updateDisplay();
    addToHistory(expr, "Error");
  }
}

function addToHistory(expr, result) {
  const entry = `${expr} = ${result}`;
  history.innerHTML = `<div>${entry}</div>${history.innerHTML}`;
}