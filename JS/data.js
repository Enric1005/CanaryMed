import { xLuIncludeFile } from "./xlu-include-file.js";
import * as users from "./auth.js";
import * as templates from "./basics_templates_data.js";
import * as profileData from "./profile_data.js";
import * as lre from "./LRE_data.js";
import * as SC from "./spe_cent_data.js";
import * as cl from "./contentLoader.js";

let DATA = null;

async function loadDynamicContent(lang = "es") {
    try {
        const response = await fetch(`../data-${lang}.json`);
        DATA = await response.json();

        //Solo descomentar cuando se necesite comprobar
        // localStorage.clear()
        // let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
        // console.log(usuarios);

        users.log_in();
        users.log_out();
        users.register_user_form();

        templates.loadHeader(DATA, loadDynamicContent);
        templates.browser(DATA);
        templates.loadFooter(DATA);
        templates.loadMain(DATA);

        lre.loadLogin(DATA);
        lre.loadRegisterAndEdit(DATA);

        profileData.loadProfile(DATA);
        profileData.loadSeccion(DATA);
        profileData.loadPendingAppointments();
        profileData.loadRecord();
        profileData.loadFavoriteCenters();
        profileData.seeMorePendingAppointments();
        profileData.seeMoreRecord();
        profileData.seeMoreFavoriteCenters();

        cl.loadWorkWithUs(DATA);
        cl.loadAboutUs(DATA);
        cl.loadClientsAsist(DATA);
        cl.loadMakeAnAppointment(DATA);

        const page = window.location.pathname.split("/").pop();

        if (page === "centers.html") {
            SC.loadCenters(DATA);
        }
        else if (page === "specialtys.html") {
            SC.loadSpecialtys(DATA);
        }

        SC.loadCenter(DATA);
        SC.loadSpecialty(DATA);

    } catch(error) {
        console.error("Error cargando JSON:", error);
    }
}

document.addEventListener('DOMContentLoaded', async function () {
    if (!window.includesLoaded) {
        window.includesLoaded = true;
        await xLuIncludeFile(); // esperar a que los includes se carguen
    }

    const lang = localStorage.getItem("lang") || "es";
    await loadDynamicContent(lang);

    const page = window.location.pathname.split("/").pop();
    if (page === "centers.html") {
        SC.loadFilters("centers", DATA);
    } else if (page === "specialtys.html") {
        SC.loadFilters("specialities", DATA);
    }

    const menuToggle = document.querySelector(".menu-toggle");
    const navMenu = document.querySelector(".second_line ul");
    const overlay = document.querySelector(".menu-overlay");

    function closeMenu() {
        navMenu.classList.remove("show");
        overlay.classList.remove("show");
    }

    menuToggle.addEventListener("click", () => {
        navMenu.classList.toggle("show");
        overlay.classList.toggle("show");
    });

    overlay.addEventListener("click", closeMenu);

    window.addEventListener("scroll", () => {
        if (navMenu.classList.contains("show")) {
            closeMenu();
        }
    });
});