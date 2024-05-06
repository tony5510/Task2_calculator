export default function isNumber(item) {
    return /^-?\d+(\.\d+)?$/.test(item);
}
