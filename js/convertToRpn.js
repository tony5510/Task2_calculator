import isNumber from './isNumber.js'
import operationPriorities from './operationPriorities.js'

export default function convertToRpn(token) {
    const pToken = []
    const stack = []

    token.forEach(item => {
        if(isNumber(item)) pToken.push(item)
        else if (item === '(') stack.push(item)
        else if (item === ')') {
            while(stack[stack.length - 1] !== '(') {
                pToken.push(stack.pop())
            }
            stack.pop()
        } else {
            while (operationPriorities[stack[stack.length - 1]] >= operationPriorities[item]) {
                pToken.push(stack.pop())
            }
            stack.push(item)
        }
    })
    while (stack.length > 0) {
        pToken.push(stack.pop())
    }

    return pToken
}