import isNumber from './isNumber.js'

export default function splitIntoTokens(string) { 
    let token = [];
    let currentNumber = '';
    string.split('').forEach((char) => { 
        if (isNumber(char) || char === '.') {
            currentNumber = currentNumber + char;
        } else if ((char === '-') && (currentNumber === '') && ((token.length === 0) || (token[token.length-1] === '('))) {
            token.push('0');
            token.push(char);
        } else {
            if (currentNumber !== '') token.push(currentNumber) 
            token.push(char);
            
            currentNumber = '';
        }
        
    });
    
    if (currentNumber !== '') token.push(currentNumber);
    return token;
}
