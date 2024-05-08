import isNumber from './isNumber.js'

export default function splitIntoTokens(string) { 
    let tokens = [];
    let currentNumber = '';
    string.split('').forEach((char) => { 
        if (isNumber(char) || char === '.') {
            currentNumber = currentNumber + char;
        } else if ((char === '-') && (currentNumber === '') && ((tokens.length === 0) || (tokens[tokens.length-1] === '('))) {
            tokens.push('0');
            tokens.push(char);
        } else {
            if (currentNumber !== '') tokens.push(currentNumber) 
            tokens.push(char);
            
            currentNumber = '';
        }
        
    });
    
    if (currentNumber !== '') tokens.push(currentNumber);
    return tokens;
}
