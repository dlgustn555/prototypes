import './src/style/index2.css';
import { getSelector } from "./src/util";

document.addEventListener("DOMContentLoaded", () => {
    const popupTemplate: any = getSelector('#popup_template');
    const clone = document.importNode(popupTemplate.content, true);
    document.body.appendChild(clone);
});