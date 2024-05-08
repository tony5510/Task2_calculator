import isBracketsValid from './isBracketsValid.js'
import copyToClipboard from './copyToClipboard.js'
import changeFontSize from './changeFontSize.js'
import expPreparing from './expPreparing.js'
import isOperator from './isOperator.js';
import calc from './calc.js'

const inputField = document.querySelector('#input');
const buttons = document.querySelector('.buttons')

inputField.addEventListener('input', function() {
    changeFontSize(inputField);
});

inputField.addEventListener('keydown', function(event) {
    if (!/[0-9/*\-+()]/.test(event.key) && event.key !== "Backspace" && event.key !== "ArrowLeft" &&
    event.key !== "ArrowRight")  {
        event.preventDefault();
    }
});
 
buttons.addEventListener('click', function(event) {
    if(!event.target.classList.contains('btn')) return;

    if(inputField.value === 'Ошибка') inputField.value = '';

    const value = event.target.innerText;

    switch(value) {
        case 'copy':
            copyToClipboard(inputField.value);
            break;
        case 'AC':
            inputField.value = '';
            break;
        case '←':
            inputField.value = inputField.value.substring(0, inputField.value.length - 1);
            break;
        case '=':
            if(isBracketsValid(inputField.value)){
                inputField.value = calc(expPreparing(inputField.value));
            } else {
                inputField.value = "Ошибка";
            }
            break;
        default:
            if (inputField.value === '' && isOperator(value)) {
                inputField.value = '0' + value;
            } else if (isOperator(inputField.value[inputField.value.length - 1]) && isOperator(value)) {
                inputField.value = inputField.value.substring(0, inputField.value.length - 1) + value;
            }else {
                inputField.value += value;
            }
    }
    changeFontSize(inputField);
});