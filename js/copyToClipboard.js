export default async function copyToClipboard(text) {
    try {
        await navigator.clipboard.writeText(text);
    } catch (err) {
        console.error('Не удалось скопировать текст: ', err);
    }
}