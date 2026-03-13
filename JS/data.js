import { xLuIncludeFile } from "./xlu-include-file.js";

let DATA = null;

export async function loadDynamicContent() {
    const response = await fetch("../tsconfig.json");
    DATA = await response.json();

    loadHeader();
    loadCenters();
    loadFooter();
}

function loadHeader() {
    const header = DATA.header;
    const logoH1 = document.querySelector("#logo h1");
    if (logoH1) logoH1.textContent = header.logo;

    const searchInput = document.getElementById("searchInput");
    const filterButton = document.getElementById("filterButton");
    if (searchInput) searchInput.placeholder = header.browser.text;
    if (filterButton) filterButton.textContent = header.browser.filter;

    const userIcon = document.getElementById("userIcon");
    if (userIcon) userIcon.src = header.user_icon;

    const select = document.getElementById("languages");
    if (select) {
        select.innerHTML = "";
        header.languages.forEach(lang => {
            const option = document.createElement("option");
            option.value = lang.code;
            option.textContent = lang.name;
            select.appendChild(option);
        });
    }

    const navMenu = document.getElementById("navMenu");
    if (navMenu) {
        navMenu.innerHTML = "";
        header.nav.forEach(item => {
            const li = document.createElement("li");
            const a = document.createElement("a");
            a.href = item.url;
            a.textContent = item.text;
            li.appendChild(a);
            navMenu.appendChild(li);
        });
    }
}

function loadCenters() {
    const centersData = DATA.centers;
    const templates = document.querySelectorAll('main[xlu-include-file="../Templates/center.html"]');

    templates.forEach((template, index) => {
        const center = centersData[index];
        if (!center) return;

        const img = template.querySelector(".center");
        const h1 = template.querySelector(".center-text h1");
        const h3 = template.querySelector(".center-text h3");
        const p = template.querySelector(".center-text p");
        const btn = template.querySelector(".center-button");

        if (img) img.src = center.image;
        if (h1) h1.textContent = center.name;
        if (h3) h3.textContent = center.description;
        if (btn) btn.textContent = DATA.Bienvenida_home.texto_boton;
        if (p && !p.textContent.trim()) {
            p.textContent = "Descripción adicional disponible aquí.";
        }
    });
}

function loadFooter() {
    const footer = DATA.footer;

    const logoH1 = document.querySelector("#footerLogo h1");
    if (logoH1) logoH1.textContent = footer.logo;

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

document.addEventListener("DOMContentLoaded", async () => {
    if (!window.includesLoaded) {
        window.includesLoaded = true;
        await xLuIncludeFile();
    }
    await loadDynamicContent();
});