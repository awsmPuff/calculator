// Theme Change
const themeOne = document.querySelector('#first');
const themeTwo = document.querySelector('#second');
const themeThree = document.querySelector('#third');
const ballBtn = document.querySelector('.ball');

themeOne.addEventListener('change', () => {
    ballBtn.style.left = '0.2rem';
    document.querySelector('body').classList.add('theme-one');
    document.querySelector('body').classList.remove('theme-two');
    document.querySelector('body').classList.remove('theme-three');
})
themeTwo.addEventListener('change', () => {
    ballBtn.style.left = '1.2rem';
    document.querySelector('body').classList.add('theme-two');
    document.querySelector('body').classList.remove('theme-one');
    document.querySelector('body').classList.remove('theme-three');
})
themeThree.addEventListener('change', () => {
    ballBtn.style.left = '2.2rem';
    document.querySelector('body').classList.add('theme-three');
    document.querySelector('body').classList.remove('theme-two');
    document.querySelector('body').classList.remove('theme-one');
})

// Calculation
const input = document.querySelector(".screen");
const keys = document.querySelector(".keyss");
const calculator = {
    displayVal: '0',
    firstOperand: null,
    waitingForSecondOperand: false,
    operator: null
}

const updateDisplay = () => {
    input.value = calculator.displayVal;
}
updateDisplay();

const inputDigit = (digit) => {
    const {displayVal, waitingForSecondOperand} = calculator;
    if(waitingForSecondOperand === true) {
        calculator.displayVal = digit;
        calculator.waitingForSecondOperand = false;
    } else {
        calculator.displayVal = displayVal === '0' ? digit : displayVal + digit;
    }
    
    console.log(calculator);
}

const inputDecimal = (dot) => {
    if(calculator.waitingForSecondOperand === true) {
        calculator.displayVal = '0.';
        calculator.waitingForSecondOperand = false;
        return;
    }
    if(!calculator.displayVal.includes(dot)) {
        calculator.displayVal += dot;
    }
}

const handleOperator = (nextOperator) => {
    const {firstOperand, displayVal, operator} = calculator;
    const inputVal = parseFloat(displayVal);

    // Two or more operators entered
    if(operator && calculator.waitingForSecondOperand) {
        calculator.operator = nextOperator;
        console.log(calculator);
        return;
    }
 
    if(firstOperand === null && !isNaN(inputVal)) {
        calculator.firstOperand = inputVal;
    } else if(operator) {
        const result = calculate(firstOperand, inputVal, operator);
        calculator.displayVal = `${parseFloat(result.toFixed(7))}`;
        calculator.firstOperand = result;
    }
    calculator.waitingForSecondOperand = true;
    calculator.operator = nextOperator;
    console.log(calculator);
}

const calculate = (firstOperand, secondeOperand, operator) => {
    if(operator === '+') {
        return firstOperand + secondeOperand;
    } else if(operator === '-') {
        return firstOperand - secondeOperand;
    } else if(operator === '*') {
        return firstOperand * secondeOperand;
    } else if(operator === '/') {
        return firstOperand / secondeOperand;
    }
    return secondeOperand;
}

const reset = () => {
    calculator.displayVal = '0';
    calculator.firstOperand = null;
    calculator.waitingForSecondOperand = false;
    calculator.operator = null;
    console.log(calculator);
}

const del = () => {
    calculator.displayVal = calculator.displayVal.substring(0, input.value.length - 1);
    updateDisplay();
    if(calculator.displayVal === '') {
        calculator.waitingForSecondOperand = false;
        calculator.firstOperand === '0';
    }
    calculator.firstOperand === calculator.displayVal;
}


keys.addEventListener("click", e => {
    const {target} = e;
    const {value} = target;
    if(!target.matches('button')) {
        return;
    }

    switch (value) {
        case '+':
        case '-':
        case '*':
        case '/':
        case '=':
            handleOperator(value);
        break;
        case '.':
            inputDecimal(value);
        break;
        case 'reset':
            reset();
        break;
        case 'del':
            del();
        default:
            if(Number.isInteger(parseFloat(value))) {
                inputDigit(value);
            }
    }
    updateDisplay();
})



