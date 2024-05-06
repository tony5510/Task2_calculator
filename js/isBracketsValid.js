export default function(str) {
    const chars = str.split('');
    const stack = [];

    for (var i = 0, len = chars.length; i < len; i++) {
       if (chars[i] === '(') {
           stack.push('(');
           continue;
       }

       if (chars[i] === ')') {
           if (stack.pop() !== '(') {
               return false;
           }
       }
    }

    if (stack.length !== 0) {
        return false;
    }

    return true;
}