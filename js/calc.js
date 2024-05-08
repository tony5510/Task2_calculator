import splitIntoTokens from './splitIntoTokens.js'
import convertToRpn from './convertToRpn.js'
import isNumber from './isNumber.js'

export default function calculator(expression) {
    const tokens = splitIntoTokens(expression)
    const rpnTokens = convertToRpn(tokens)
    const stack = [];
    
    try {
        rpnTokens.forEach(token => {
            if (isNumber(token)) { 
                stack.push(parseFloat(token));
            } else { 
                const operand2 = stack.pop();
                const operand1 = stack.pop();
    
                switch (token) {
                    case '+':
                        stack.push(operand1 + operand2);
                        break;
                    case '-':
                        stack.push(operand1 - operand2);
                        break;
                    case '*':
                        stack.push(operand1 * operand2);
                        break;
                    case '/':
                        stack.push(operand1 / operand2);
                        break;
                    default:
                        console.log("Ошибка, недопустимый оператор: " + token)
                }
            }
        })

        if(isNumber(stack[0])) {
            return stack.pop(); 
        } else {
            return "Ошибка";
        }

    } catch (error) {
        console.log(error)
    }
}