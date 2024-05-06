import isBracketsValid from './isBracketsValid.js'
import isNumber from './isNumber.js'
import calc from './calc.js'

const inputField = document.querySelector('#input');
const buttons = document.querySelector('.buttons')

async function copyToClipboard() {
    try {
        await navigator.clipboard.writeText(inputField.value);
    } catch (err) {
        console.error('Не удалось скопировать текст: ', err);
    }
}

function changeFontSize() {
    if (inputField.value.length > 9) {
        inputField.style.fontSize = '2rem'; 
    } else {
        inputField.style.fontSize = '4rem'; 
    }
}

inputField.addEventListener('input', function(event) {
    changeFontSize();
});

inputField.addEventListener('keydown', function(event) {
    if (!/[0-9/*\-+()]/.test(event.key) && event.key !== "Backspace") {
        event.preventDefault();
    }

    const inputValue = event.target.value;
    
    if (inputValue.length === 0 && /[/*\+]/.test(event.key)) {
        event.preventDefault();
        return;
    }
    
    if (/[/*\-+]/.test(inputValue.slice(-1)) && /[/*\-+]/.test(event.key)) {
        inputField.value = inputField.value.substring(0, inputField.value.length - 1) + event.key;
        event.preventDefault();
        return;
    }

});


buttons.addEventListener('click', function(event) {
    if(!event.target.classList.contains('btn')) return;
    
    if(inputField.value === 'Ошибка'){
        inputField.value = ''
    }

    const value = event.target.innerText;
    const lastChar = inputField.value[inputField.value.length - 1];
    const isOperator = ['+', '-', '*', '/'].includes(lastChar);

    switch(value) {
        case 'copy':
            copyToClipboard();
            break;
        case 'AC':
            inputField.value = '';
            break;
        case '←':
            inputField.value = inputField.value.substring(0, inputField.value.length - 1);
            break;
        case '=':
            if(isBracketsValid(inputField.value)){
                try {
                    inputField.value = calc(inputField.value);
                } catch (error) {
                    inputField.value = "Ошибка"
                    console.error('Ошибка при вычислении:', error.message);
                }
            } else {
                inputField.value = "Ошибка"
            }
            break;
        default:
            if (inputField.value === '' && ['+', '-', '*', '/'].includes(value)) {
                inputField.value = '0' + value;
            } else if (isOperator && ['+', '-', '*', '/'].includes(value)) {
                inputField.value = inputField.value.substring(0, inputField.value.length - 1) + value;
            } else if (inputField.value.slice(-1) === '(' && ['+', '*', '/'].includes(value)){
                inputField.value += '0' + value;
            } else if (isNumber(inputField.value.slice(-1)) && value === '(') {
                inputField.value += '*' + value;
            } else if (isNumber(value) && inputField.value.slice(-1) === ')') {
                inputField.value += '*' + value;
            }else {
                inputField.value += value;
            }
            
    }

    changeFontSize();
    inputField.focus();
    inputField.selectionEnd = inputField.value.length;
});

