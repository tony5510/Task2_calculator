export default function changeFontSize(element) {
    if (!(element instanceof HTMLElement)) {
        console.error('Аргумент должен быть DOM-элементом');
        return;
    }

    if (element.value.length > 9) {
        element.style.fontSize = '1.5rem';
    } else {
        element.style.fontSize = '3.5rem';
    }
}