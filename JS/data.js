import { xLuIncludeFile } from "./xlu-include-file.js";
import { register_user_form } from "./users.js";
import { log_in } from "./users.js";
import { log_out } from "./users.js";

let DATA = null;

async function loadDynamicContent(lang = "es") {
    try {
        const response = await fetch(`../data-${lang}.json`);
        DATA = await response.json();

        log_in();
        log_out();
        register_user_form();
        loadHeader();
        loadProfile();
        loadFooter();
        loadLogin();
        loadRegisterAndEdit();
        loadMain();
        loadWorkWithUs();
        loadAboutUs();
        loadClientsAsist();
        loadSeccion();
        loadMakeAnAppointment();

        const page = window.location.pathname.split("/").pop();

        if (page === "centers.html") {
            loadCenters();
        }
        else if (page === "specialtys.html") {
            loadSpecialtys();
        }

        loadCenter();

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


    const activo = JSON.parse(localStorage.getItem("usuarioActivo"));
    const user_link = document.querySelector("#btn_user a");

    if (user_link) {
        if (activo) {
            user_link.href = "../Paginas/profile.html";
        } else {
            user_link.href = "../Paginas/login.html";
        }
    }
    const userIcon = document.getElementById("userIcon");
    if (userIcon) {
        if (!activo) {
            userIcon.src = header.user_icon;
        } else {
            userIcon.src = "../Assets/icono_check.png";
        }
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

function loadFilters(type) {
    const filtersContainer = document.querySelector("main .filter_zone2");
    if (!filtersContainer) return;

    filtersContainer.innerHTML = "";

    let filterData = [];
    let buttonText = DATA.boton_filtro;

    if (type === "centers") {
        filterData = DATA.filtro_centros;
    } else if (type === "specialities") {
        filterData = DATA.specialities.filters.map(f => f.name);
    }

    const applyButton = document.createElement("input");
    applyButton.type = "submit";
    applyButton.value = buttonText;
    applyButton.classList.add("filter_zone_input");
    filtersContainer.appendChild(applyButton);

    filterData.forEach(filtro => {
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.value = filtro;
        checkbox.classList.add("filter_zone_ch");
        checkbox.id = `filter_${filtro.replace(/\s+/g, "_")}`;

        const label = document.createElement("label");

        label.appendChild(checkbox);
        label.appendChild(document.createTextNode(filtro));

        filtersContainer.appendChild(label);
    });
}

function loadCenters() {
    loadFilters("centers");
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

function loadSpecialtys() {
    loadFilters("specialities");
    const specialtysData = DATA.specialities.Especialidades;
    const specialtysHTML = document.querySelectorAll("main .specialty-section");

    specialtysHTML.forEach((element, index) => {
        const specialty = specialtysData[index];
        if (!specialty) return;

        const img = element.querySelector("img.specialty");
        const h1 = element.querySelector("h1");
        const h3 = element.querySelector("h3");
        const button = element.querySelector(".specialty-button");

        if (img) img.src = specialty.src;
        if (h1) h1.textContent = specialty.name;
        if (h3) h3.textContent = specialty.desc;

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
    const edit_activo = localStorage.getItem("editMode");

    const labels = document.querySelectorAll("#register_form label:not(.chbox label)");
    labels.forEach((label, index) => {
        label.textContent = DATA.register_edit.fields[index].field;
    });

    if (edit_activo) {
        const usuario = JSON.parse(localStorage.getItem("usuarioActivo"));
        if (usuario) {
            const title = document.querySelector(".text h1");
            if (title) title.textContent = "Editar";

            // Rellenar inputs con los datos actuales del usuario
            const inputs = document.querySelectorAll(
                "#register_form input:not([type='checkbox']):not([type='submit'])"
            );

            const valores = [
                usuario.nombre,
                usuario.apellidos,
                usuario.correo,
                usuario.correo,
                "",
                "",
                usuario.NIF,
                usuario.telefono
            ];

            inputs.forEach((input, index) => {
                input.value = valores[index] || "";
            });

            // Ocultar checkbox en modo edición
            const checkBox = document.querySelector(".chbox");
            if (checkBox) checkBox.style.display = "none";

            // Cambiar texto del botón
            const acceptButton = document.querySelector(".contenedor2 .boton input[type='submit']");
            if (acceptButton) acceptButton.value = "Guardar cambios";
        }
    } else {
        const title = document.querySelector(".text h1");
        if (title) title.textContent = DATA.register_edit.title;

        const inputs = document.querySelectorAll(
            "#register_form input:not([type='checkbox']):not([type='submit'])"
        );
        inputs.forEach((input, index) => {
            input.placeholder = DATA.register_edit.fields[index].example_text;
        });

        const checkBox = document.querySelector(".chbox label");
        if (checkBox) checkBox.textContent = DATA.register_edit.checkbox;

        const acceptButton = document.querySelector(".contenedor2 .boton input[type='submit']");
        if (acceptButton) acceptButton.value = DATA.register_edit.register_button;
    }
}

function loadMakeAnAppointment() {
    const title = document.querySelector("#title");
    if (title) title.textContent = DATA.make_an_appointment.title;

    const labels = document.querySelectorAll("#formCita label");
    labels.forEach((label, index) => {
        if (DATA.make_an_appointment.fields[index]) {
            label.textContent = DATA.make_an_appointment.fields[index].campo;
        }
    });

    const inputs = document.querySelectorAll("#formCita input");
    inputs.forEach((input, index) => {
        if (DATA.make_an_appointment.fields[index]) {
            input.placeholder = DATA.make_an_appointment.fields[index].texto_ejemplo;
        }
    });

    const selects = document.querySelectorAll("#formCita select");
    selects.forEach((select, index) => {
        if (DATA.make_an_appointment.fields[index]) {
            select.options[0].textContent =
                DATA.make_an_appointment.fields[index+3].texto_ejemplo;
        }
    });

    // Botón
    const button = document.querySelector("#boton_confirmar");
    if (button) {
        button.textContent = DATA.make_an_appointment.boton_confirmar;
    }
}
function loadCenter() {
    const page = window.location.pathname.split("/").pop();

    // Si estamos en la lista de centros
    if (page === "centers.html") {
        const centerButtons = document.querySelectorAll('.center-section .center-content .center-button');
        console.log("Botones encontrados:", centerButtons.length);

        centerButtons.forEach((centerButton, index) => {
            centerButton.addEventListener('click', () => {
                localStorage.setItem("selectedCenterIndex", index);
                window.location.href = "center_page.html";
            });
        });
    }

    // Si estamos en la página de un centro específico
    if (page === "center_page.html") {
        const index = localStorage.getItem("selectedCenterIndex");
        if (index === null) return;

        const center = DATA.centers[index];

        const buton_back = document.querySelector(".text-section2 .text-header button");
        if(buton_back) buton_back.textContent = DATA.button_back;

        const title = document.querySelector(".text-section2 .text-header h1");
        if(title) title.textContent = center.name;

        const image = document.querySelector(".text-section2 .center-image img");
        if(image) image.src = center.image;

        const description = document.querySelector(".text-section2 p");
        if(description) description.textContent = center.description;

        const centerSpecialitiesImages = document.querySelectorAll(
            ".specialty_center-section .specialty_center-content .specialty_center-image img"
        );
        centerSpecialitiesImages.forEach((img, i) => {
            if(center.specialities[i]) img.src = center.specialities[i].src;
        });

        const centerSpecialities = document.querySelectorAll(
            ".specialty_center-section .specialty_center-content .specialty_center-text"
        );
        centerSpecialities.forEach((speciality, i) => {
            if(center.specialities[i]) {
                const title = speciality.querySelector("h1");
                if (title) title.textContent = center.specialities[i].name;

                const price = speciality.querySelector("p[data-type='price']");
                if (price) price.textContent = center.specialities[i].price;

                const location = speciality.querySelector("p[data-type='location']");
                if (location) location.textContent = center.specialities[i].location;

                const doctor = speciality.querySelector("p[data-type='doctor']");
                if (doctor) doctor.textContent = center.specialities[i].doctor;

                const button = speciality.closest(".specialty_center-content")
                                                  .querySelector(".specialty_center-button");
                if (button) {button.textContent = DATA.make_an_appointment.title;}
            }
        });
    }
}

function loadWorkWithUs(){
    const workWithUsData = DATA.work_with_us;

    const workWithUsTitle = document.querySelector(".text-section .text-header h1");
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
        for (let i = 0; i < footer.titulos_nav[index].navs.length; i++) {
            const li = document.createElement("li");
            const a = document.createElement("a");

            a.href = footer.titulos_nav[index].navs[i].src;
            a.textContent = footer.titulos_nav[index].navs[i].nav;

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

function loadClientsAsist() {
    const title = document.querySelector("#main_asist_header h1");
    if (title) title.textContent = DATA.client_asist.title;

    const label = document.querySelector(".contenedor label[for='lorem']");
    if (label) label.textContent = DATA.client_asist.campo_text;

    const textarea = document.querySelector("#lorem");
    if (textarea) textarea.placeholder = DATA.client_asist.texto_ejemplo;

    const button = document.querySelector(".contenedor input[type='submit']");
    if (button) button.value = DATA.client_asist.boton;
}

function loadProfile() {
    const profile = DATA.perfil;
    const btn_exit = document.getElementById("log_out_btn");
    if (btn_exit) btn_exit.textContent = profile.boton_salir;

    const btn_esp = document.getElementById("btn_esp");
    if (btn_esp) {
        btn_esp.textContent = profile.boton_editar;
        btn_esp.addEventListener("click", () => {
            localStorage.setItem("editMode", "true");
        })
    }

    profile.secciones.forEach((sec, index) => {
        const container = document.getElementById(`profile_section${index + 1}`);
        if (!container) return;

        const title = container.querySelector(".section-header span");
        const link = container.querySelector(".card-footer a");

        if (title) title.textContent = sec.titulo;
        if (link) {
            link.textContent = sec.texto;

            link.addEventListener("click", () => {
                localStorage.setItem("seccionActiva", sec.key);
            });
        }
    });

    const usuario = JSON.parse(localStorage.getItem("usuarioActivo"));
    if (usuario) {
        const name_user = usuario?.nombre;
        const surname_user = usuario?.apellidos;
        const email_user = usuario?.correo;
        const phone_user = usuario?.telefono;
        const DNI = usuario?.NIF;

        const name_title = document.querySelector(".profile-info h3");
        const nif = document.querySelector(".profile-info h4");

        const all_name = document.getElementById("texto1");
        const mail = document.getElementById("texto2");
        const phone = document.getElementById("texto3");

        if (name_title) name_title.textContent = name_user;
        if (nif) nif.textContent = DNI;

        const fullname = `${name_user || ""} ${surname_user || ""}`;
        if (all_name) all_name.textContent = fullname;
        if (mail) mail.textContent = email_user;
        if (phone) phone.textContent = phone_user;
    }
}

function loadSeccion() {
    if (!DATA?.perfil?.secciones) return;

    const key = localStorage.getItem("seccionActiva");

    const seccion = DATA.perfil.secciones.find(s => s.key === key);

    const titulo = document.querySelector(".text-section3 .text-header h1");

    if (titulo && seccion) {
        titulo.textContent = seccion.titulo;
    }

    const buton_back = document.querySelector(".text-section3 .text-header button");
    if(buton_back) buton_back.textContent = DATA.button_back;
}

document.addEventListener('DOMContentLoaded', async function () {
    if (!window.includesLoaded) {
        window.includesLoaded = true;
        await xLuIncludeFile(); // esperar a que los includes se carguen
    }

    const lang = localStorage.getItem("lang") || "es";
    await loadDynamicContent(lang);

    loadCenter();

    const page = window.location.pathname.split("/").pop();
    if (page === "centers.html") {
        loadFilters("centers");
    } else if (page === "specialtys.html") {
        loadFilters("specialities");
    }
});