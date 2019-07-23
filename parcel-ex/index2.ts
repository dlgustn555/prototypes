import { getSelector } from "./src/util";

document.addEventListener("DOMContentLoaded", () => {
    const popupTemplate = getSelector('#popup_template');
    console.log('content' in popupTemplate);

    const oTest = {
        content: { text: 'abcdefg' }
    };

    console.log('content' in oTest);
});