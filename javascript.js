document.addEventListener('DOMContentLoaded', function() {

const display = document.querySelector('.display');
const buttons = document.querySelectorAll('button');

let firstNumber = '';
let secondNumber = '';
let operation = '';

buttons.forEach(button => {
    button.addEventListener('click', () => {
        let btnText = button.innerText;

        if (btnText === 'C') {
            clear();
            updateDisplay();
            return;
        }

        if (btnText === '=') {
            operate();
            /*fare la funzione operate*/
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
    display.innerText = secondNumber;
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
            result = first / second;
            break;
        default:
            return;
    }
    secondNumber = result.toString();
}
})

