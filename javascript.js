document.addEventListener('DOMContentLoaded', function() {

const display = document.querySelector('.display');
const buttons = document.querySelectorAll('button');

let firstNumber = '';
let secondNumber = '';
let operation = '';

buttons.forEach(button => {
    button.addEventListener('click', () => {
        let btnText = button.innerText;
        if (display.textContent.length > 16 && button.classList.contains('number')) {
            return;
        }

        if (button.classList.contains('number')) {
            if (btnText === '.' && secondNumber.includes('.')) {
                return;
            }
        }

        if (btnText === 'C') {
            clear();
            updateDisplay();
            return;
        }

        if (btnText === '+/-') {
            if (secondNumber !== '') {
                secondNumber = (parseFloat(secondNumber) * -1).toString();
                updateDisplay();
            }
            return;
        }

        if (btnText === '%') {
            if (secondNumber !== '') {
                secondNumber = (parseFloat(secondNumber) / 100 * secondNumber).toString();
                btnText = '';
            }
        }


        if (btnText === '=') {
            operate();
            updateDisplay();
            return;
        }

        if (btnText === '+' || btnText === '-' || btnText === 'x' || btnText === '/') {
            if (secondNumber !== '') {
                operate();
            }
            operation = btnText;
            firstNumber = secondNumber;
            secondNumber = '';
            return;
        }
        
        secondNumber += btnText;
        updateDisplay();
    })
})

function updateDisplay() {
    displayText = '';
    if (operation !== '') {
        displayText = firstNumber + '' + operation;
    } else {
        displayText = firstNumber;
    }
    if (secondNumber !== '') {
        displayText += '' + secondNumber;
    }
    
    if (display.length > 16) {
        displayText = displayText.substring(0, 16);
    }
    display.innerText = displayText;
}

function clear() {
    firstNumber = '';
    secondNumber = '';
    operation = '';
}

function operate() {
    let result;
    const first = parseFloat(firstNumber);
    const second = parseFloat(secondNumber);
    
    if (isNaN(first) || isNaN(second))
    return;

    
    switch(operation) {
        case '+':
            result = first + second;
            break;
        case '-':
            result = first - second;
            break;
        case 'x':
            result = first * second;
            break;
        case '/':
            if ((second == 0) && (operation === '/')) {
                result = 'Error';
            } else {
                result = first / second;
            }
            break;
        default:
            return;
    }

    if (Number.isInteger(result)) {
        secondNumber = result.toString();
    } else {
        secondNumber = result.toFixed(2);
    }
    
    firstNumber = '';
    operation = '';
}
})

