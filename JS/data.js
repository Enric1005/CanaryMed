import { xLuIncludeFile } from "./xlu-include-file.js";
import { register_user_form } from "./users.js";
import { log_in } from "./users.js";
import { log_out } from "./users.js";

let DATA = null;

export async function loadDynamicContent(lang = "es") {
    try {
        const response = await fetch(`../data-${lang}.json`);
        DATA = await response.json();

        log_in();
        log_out();
        register_user_form();
        loadHeader();
        loadFooter();
        loadLogin();
        loadRegisterAndEdit();
        loadMain();
        loadCenters();
        loadWorkWithUs();
        loadAboutUs();

    } catch(error) {
        console.error("Error cargando JSON:", error);
    }
}

function loadHeader(){
    const header = DATA.header;

    const logo = document.querySelector("#logo h1");
    if (logo) {
        logo.textContent = header.logo;
    }

    const searchInput = document.getElementById("searchInput");
    if (searchInput) {
        searchInput.placeholder = header.browser.text;
    }

    const filterButton = document.getElementById("filterButton");
    if (filterButton) {
        filterButton.textContent = header.browser.filter;
    }

    const userIcon = document.getElementById("userIcon");
    if (userIcon) {
        userIcon.src = header.user_icon;
    }

    const select = document.getElementById("languages");
    if (select) {
        select.innerHTML = "";
        header.languages.forEach(lang => {
            const option = document.createElement("option");
            option.value = lang.code;
            option.textContent = lang.name;
            select.appendChild(option);
        });

        const savedLang = localStorage.getItem("lang") || "es";
        select.value = savedLang;

        select.addEventListener("change", function(){
            const selectedLang = this.value;
            localStorage.setItem("lang", selectedLang);
            loadDynamicContent(selectedLang);
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

    const welcomeTitle = document.querySelector(".image_text h1");
    if (welcomeTitle) {
        welcomeTitle.textContent = bienvenida.texto_bienvenida;
    }

    const welcomeButton = document.querySelector(".image-btn");
    if (welcomeButton) {
        welcomeButton.textContent = bienvenida.texto_boton;
    }

    const mainCenterTitle = document.querySelector(".main_center h2.title");
    if (mainCenterTitle && bienvenida.texto_centros_recomendados) {
        mainCenterTitle.textContent = bienvenida.texto_centros_recomendados;
    }

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

function loadCenters() {
    const centersData = DATA.centers;
    const centersHTML = document.querySelectorAll("main .center-section");

    centersHTML.forEach((element, index) => {
        const center = centersData[index];
        if (!center) return;

        const img = element.querySelector("img.center");
        const h1 = element.querySelector("h1");
        const h3 = element.querySelector("h3");
        const p = element.querySelector("p");
        const button = element.querySelector(".center-button");

        if (img) img.src = center.image;
        if (h1) h1.textContent = center.name;
        if (h3) h3.textContent = center.name;
        if (p) p.textContent = center.description;

        if (button) {
            button.textContent = DATA.boton_esp || "Ver más";
        }
    });
}

function loadLogin(){
    const loginTitle = document.querySelector(".login h1");
    if (loginTitle) loginTitle.textContent = DATA.login.title;

    const loginLabels = document.querySelectorAll(".login #login_form label");
    if (loginLabels) {
        loginLabels.forEach((label, index) => {
            label.textContent = DATA.login.fields[index].field;
        })
    }

    const loginButton = document.querySelector(".login .botones button[type=submit]");
    const cancelButton = document.querySelector(".login .botones button[type=button]");
    if (loginButton) {loginButton.textContent = DATA.login.login_button;}
    if (cancelButton) {cancelButton.textContent = DATA.login.cancel_button;}

    const registerLink = document.querySelector(".login nav a");
    if (registerLink) {registerLink.textContent = DATA.login.register_link}
}

function loadRegisterAndEdit(){
    const labels = document.querySelectorAll(".contenedor .text_box #register_form label");
    if (labels) {
        labels.forEach((label, index) => {
            label.textContent = DATA.register_edit.fields[index].field;
        })
    }
    const inputs = document.querySelectorAll(".contenedor .text_box #register_form input");
    inputs.forEach((input, index) => {
        input.placeholder = DATA.register_edit.fields[index].example_text;
    });
}


function loadWorkWithUs(){
    const workWithUsData = DATA.work_with_us;

    const workWithUsTitle = document.querySelector(".text-section h1");
    if(workWithUsTitle){
        workWithUsTitle.textContent = workWithUsData.title_page;
    }

    const workWithUsDescription = document.querySelector(".text-section p");
    if(workWithUsDescription){
        workWithUsDescription.textContent = workWithUsData.description;
    }

    const workWithUsButton = document.querySelector(".text-section .text-header .section-btn");
    if(workWithUsButton){
        workWithUsButton.textContent = DATA.button_back;
    }

    const workWithUsFormTitle = document.querySelector(".formulario h1");
    if(workWithUsFormTitle){
        workWithUsFormTitle.textContent = workWithUsData.form_title;
    }

    const workWithUsFormLabels = document.querySelectorAll(".formulario form label");
    const workWithUsFormInputs = document.querySelectorAll(".formulario form input");

    if(workWithUsFormLabels){
        workWithUsFormLabels.forEach(((label, index) => {
            label.textContent = workWithUsData.campos_formulario[index].campo;
        }))
    }
    if(workWithUsFormInputs){
        workWithUsFormInputs.forEach(((example_text, index) => {
            example_text.placeholder = workWithUsData.campos_formulario[index].texto_ejemplo;
        }))
    }
    const workWithUsFormSelect = document.querySelector(".formulario form select");
    if(workWithUsFormSelect){
        const options = DATA.work_with_us.campos_formulario[4].opciones;
        workWithUsFormSelect.appendChild(document.createElement("option"))
        options.forEach(o => {
            const option = document.createElement("option");
            option.textContent = o;
            workWithUsFormSelect.appendChild(option);
        })
    }

    const workWithUsFormButton = document.querySelector(".formulario .boton button");
    if(workWithUsFormButton){
        workWithUsFormButton.textContent = workWithUsData.buton_inscription
    }
}

function loadAboutUs() {
    const aboutUsData = DATA.about_us;

    const aboutUsTitle = document.querySelector(".image-section h2");
    if (aboutUsTitle){
        aboutUsTitle.textContent = aboutUsData.title;
    }

    const aboutUsDescription = document.querySelector(".overlay p");
    if (aboutUsDescription){
        aboutUsDescription.textContent = aboutUsData.description;
    }
}

function loadFooter() {
    const footer = DATA.footer;

    const logoH1 = document.querySelector("#footerLogo h1");
    if (logoH1) {
        logoH1.textContent = footer.logo;
    }

    const secciones = document.querySelectorAll(".first_line_fo .nav-sections > div");
    secciones.forEach((seccion, index) => {
        const title = seccion.querySelector("h3");
        const ul = seccion.querySelector("ul");

        if (!title || !ul) return;
        if (footer.titulos_nav[index]) {
            title.textContent = footer.titulos_nav[index].name;
        }
        ul.innerHTML = "";
        for (let i = 1; i <= 2; i++) {
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

document.addEventListener('DOMContentLoaded', async function () {
    if (!window.includesLoaded) {
        window.includesLoaded = true;
        await xLuIncludeFile();
    }

    const lang = localStorage.getItem("lang") || "es";
    await loadDynamicContent(lang);
});