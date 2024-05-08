export default function expPreparing(exp) {
    exp = exp.replace(/(\))(\(|\d)/g, '$1*$2');
    exp = exp.replace(/(\d)(\()/g, '$1*$2');
    return exp;
}