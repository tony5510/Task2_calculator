import isNumber from './isNumber.js'
import operationPriorities from './operationPriorities.js'

export default function convertToRpn(tokens) {
    const rpnTokens = []
    const stack = []
    tokens.forEach(token => {
        if(isNumber(token)) rpnTokens.push(token)
        else if (token === '(') stack.push(token)
        else if (token === ')') {
            while(stack[stack.length - 1] !== '(') {
                rpnTokens.push(stack.pop())
            }
            stack.pop()
        } else {
            while (operationPriorities[stack[stack.length - 1]] >= operationPriorities[token]) {
                rpnTokens.push(stack.pop())
            }
            stack.push(token)
        }
    })
    while (stack.length > 0) {
        rpnTokens.push(stack.pop())
    }

    return rpnTokens
}