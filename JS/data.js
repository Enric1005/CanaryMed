import { xLuIncludeFile } from "./xlu-include-file.js";

let DATA = null;

export async function loadDynamicContent(){

    const response = await fetch("../tsconfig.json");
    DATA = await response.json();

    loadHeader();
    loadMain();
    loadFooter();
}

function loadHeader(){

    const header = DATA.header;

    // LOGO
    const logo = document.querySelector("#logo h1");
    if (logo) {
        logo.textContent = header.logo;
    }

    // BUSCADOR
    const searchInput = document.getElementById("searchInput");
    if (searchInput) {
        searchInput.placeholder = header.browser.text;
    }

    const filterButton = document.getElementById("filterButton");
    if (filterButton) {
        filterButton.textContent = header.browser.filter;
    }

    // ICONO USUARIO
    const userIcon = document.getElementById("userIcon");
    if (userIcon) {
        userIcon.src = header.user_icon;
    }

    // IDIOMAS
    const select = document.getElementById("languages");
    if (select) {

        select.innerHTML = '<option value="" selected disabled>Idioma</option>';

        header.languages.forEach(lang => {

            const option = document.createElement("option");
            option.value = lang.code;
            option.textContent = lang.name;

            select.appendChild(option);

        });
    }

    // NAV
    const navMenu = document.getElementById("navMenu");
    if (navMenu) {

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
}

function loadMain() {

    const bienvenida = DATA.Bienvenida_home;

    // TEXTO BIENVENIDA
    const welcomeTitle = document.querySelector(".image_text h1");
    if (welcomeTitle) {
        welcomeTitle.textContent = bienvenida.texto_bienvenida;
    }

    const welcomeButton = document.querySelector(".image-btn");
    if (welcomeButton) {
        welcomeButton.textContent = bienvenida.texto_boton;
    }

    // TITULO CENTROS
    const mainCenterTitle = document.querySelector(".main_center h2.title");
    if (mainCenterTitle && bienvenida.texto_centros_recomendarios) {
        mainCenterTitle.textContent = bienvenida.texto_centros_recomendarios;
    }

    // CENTROS
    const centersData = DATA.centers;
    const centersHTML = document.querySelectorAll(".center");

    if (centersHTML.length > 0) {

        centersData.forEach((center, index) => {

            const element = centersHTML[index];
            if (!element) return;

            const img = element.querySelector(".hospital");
            const title = element.querySelector("h3");
            const description = element.querySelector("p");

            if (img) img.src = center.image;
            if (title) title.textContent = center.name;
            if (description) description.textContent = center.description;

        });

    }
}

function loadFooter() {

    const footer = DATA.footer;

    // LOGO FOOTER
    const logoH1 = document.querySelector("#footerLogo h1");
    if (logoH1) {
        logoH1.textContent = footer.logo;
    }

    // SECCIONES FOOTER
    const secciones = document.querySelectorAll(".first_line_fo .nav-sections > div");

    secciones.forEach((seccion, index) => {

        const title = seccion.querySelector("h3");
        const ul = seccion.querySelector("ul");

        if (!title || !ul) return;

        if (footer.titulos_nav[index]) {
            title.textContent = footer.titulos_nav[index].name;
        }

        ul.innerHTML = "";

        for (let i = 1; i <= 3; i++) {

            const li = document.createElement("li");
            const a = document.createElement("a");

            a.href = "#";
            a.textContent = `Enlace ${i}`;

            li.appendChild(a);
            ul.appendChild(li);
        }
    });

    // ICONOS REDES
    const socialContainer = document.querySelector(".footer_top .social_icons");

    if (socialContainer) {

        socialContainer.innerHTML = "";

        footer.logos.forEach(logo => {

            const a = document.createElement("a");
            a.href = logo.url;
            a.target = "_blank";

            const img = document.createElement("img");
            img.src = logo.icon;
            img.alt = "Red social";

            a.appendChild(img);
            socialContainer.appendChild(a);

        });
    }
}

document.addEventListener('DOMContentLoaded', async function () {

    if (!window.includesLoaded) {
        window.includesLoaded = true;
        await xLuIncludeFile();
    }

    await loadDynamicContent();

});