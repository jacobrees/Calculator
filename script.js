const calcOutput = document.querySelector('.calculator-output');
let displayValue = '0';
let operation = '';
let prevValue = '';
const calcBtns = document.querySelectorAll('.calc-btn');

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

function operate(operator, a, b) {
  a = Number(a);
  b = Number(b);
  switch (operator) {
    case '+':
      return add(a, b);
    case '-':
      return subtract(a, b);
    case '*':
      return multiply(a, b);
    case '/':
      return divide(a, b);
    default:
      return null;
  }
}

calcBtns.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    if (displayValue === '0' && [1, 2, 3, 4, 5, 6, 7, 8, 9].includes(Number(e.currentTarget.dataset.id))) {
      displayValue = e.currentTarget.dataset.id;
      calcOutput.innerHTML = displayValue.toString().slice(0, 13);
    } else if (displayValue !== '0' && [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].includes(Number(e.currentTarget.dataset.id))) {
      displayValue += e.currentTarget.dataset.id;
      calcOutput.innerHTML = displayValue.toString().slice(0, 13);
    } else if (!displayValue.includes('.') && e.currentTarget.dataset.id === '.') {
      displayValue += e.currentTarget.dataset.id;
      calcOutput.innerHTML = displayValue.toString().slice(0, 13);
    } else if (e.currentTarget.dataset.id === 'AC') {
      displayValue = '0';
      calcOutput.innerHTML = displayValue.toString().slice(0, 13);
      operation = '';
      prevValue = '';
    } else if (e.currentTarget.dataset.id === 'DEL' && displayValue !== '0' && displayValue.length > 1) {
      displayValue = displayValue.slice(0, -1);
      calcOutput.innerHTML = displayValue.toString().slice(0, 13);
    } else if (e.currentTarget.dataset.id === 'DEL' && displayValue !== '0' && displayValue.length === 1) {
      displayValue = '0';
      calcOutput.innerHTML = displayValue.toString().slice(0, 13);
    } else if (operation === '' && ['+', '-', '*', '/'].includes(e.currentTarget.dataset.id)) {
      operation = e.currentTarget.dataset.id;
      prevValue = displayValue;
      displayValue = '0';
    } else if (['+', '-', '*', '/'].includes(operation) && ['+', '-', '*', '/'].includes(e.currentTarget.dataset.id)) {
      displayValue = operate(operation, prevValue, displayValue);
      calcOutput.innerHTML = displayValue.toString().slice(0, 13);
      operation = e.currentTarget.dataset.id;
      prevValue = displayValue;
      displayValue = '0';
    } else if (['+', '-', '*', '/'].includes(operation) && ['='].includes(e.currentTarget.dataset.id)) {
      displayValue = operate(operation, prevValue, displayValue);
      calcOutput.innerHTML = displayValue.toString().slice(0, 13);
      prevValue = displayValue;
      displayValue = '0';
    }
  });
});
