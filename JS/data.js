import { xLuIncludeFile } from "./xlu-include-file.js";

let DATA = null;

export async function loadDynamicContent(){

    const response = await fetch("/tsconfig.json");
    DATA = await response.json();

    loadMain();
    loadHeader();
    loadFooter();
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
function loadMain() {
    // BIENVENIDA
    const bienvenida = DATA.Bienvenida_home;

    document.querySelector(".image_text h1").textContent = bienvenida.texto_bienvenida;
    document.querySelector(".image-btn").textContent = bienvenida.texto_boton;

    // CENTROS RECOMENDADOS (título)
    const mainCenterTitle = document.querySelector(".main_center h2.title");
    if (mainCenterTitle) {
        mainCenterTitle.textContent = bienvenida.texto_centros_recomendarios;
    }

    // CENTROS
    const centersData = DATA.centers;
    const centersHTML = document.querySelectorAll(".center");

    centersData.forEach((center, index) => {
        const element = centersHTML[index];
        if (!element) return;

        element.querySelector(".hospital").src = center.image;
        element.querySelector("h3").textContent = center.name;
        element.querySelector("p").textContent = center.description;
    });
}

function loadFooter() {
    const footer = DATA.footer;

    // ------------------------
    // Logo del footer
    // ------------------------
    const logoH1 = document.querySelector("#footerLogo h1");
    if (logoH1) {
        logoH1.textContent = footer.logo;
    }

    // ------------------------
    // Secciones del footer
    // ------------------------
    const secciones = document.querySelectorAll(".first_line_fo .nav-sections > div");
    secciones.forEach((seccion, index) => {
        const title = seccion.querySelector("h3");
        const ul = seccion.querySelector("ul");

        if (!title || !ul) return;

        if (footer.titulos_nav[index]) title.textContent = footer.titulos_nav[index].name;

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

    // ------------------------
    // Iconos sociales
    // ------------------------
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