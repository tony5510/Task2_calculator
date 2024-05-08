export default function isOperator(value) {
    return /^[+\-*/]$/.test(value);
}