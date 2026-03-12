import { xLuIncludeFile } from "./xlu-include-file.js";

let DATA = null;

export async function loadDynamicContent(){

    const response = await fetch("../tsconfig.json");
    DATA = await response.json();

    loadHeader();

}

function loadHeader(){

    const header = DATA.header;

    // LOGO
    document.querySelector("#logo h1").textContent = header.logo;

    // BUSCADOR
    document.getElementById("searchInput").placeholder = header.browser.text;
    document.getElementById("filterButton").textContent = header.browser.filter;

    // ICONO USUARIO
    document.getElementById("userIcon").src = header.user_icon;

    // IDIOMAS
    const select = document.getElementById("languages");
    console.log(select);
    header.languages.forEach(lang => {

        const option = document.createElement("option");
        option.value = lang.code;
        option.textContent = lang.name;

        select.appendChild(option);

    });

    // NAV
    const navMenu = document.getElementById("navMenu");
    navMenu.innerHTML = "";
    header.nav.forEach(item => {

        const li = document.createElement("li");
        const link = document.createElement("a");

        link.href = item.url;
        link.textContent = item.text;

        li.appendChild(link);
        navMenu.appendChild(li);

    });

}
document.addEventListener('DOMContentLoaded', async function () {

    if (!window.includesLoaded) {
        window.includesLoaded = true;
        await xLuIncludeFile();
    }
    await loadDynamicContent();

});