//-------------------------------------------HEADER--------------------------------------------
export function loadHeader(DATA){
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


    const activo = localStorage.getItem("usuarioActivo");
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

//-------------------------------------------MAIN--------------------------------------------
export function loadMain(DATA) {
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

//-------------------------------------------FOOTER--------------------------------------------
export function loadFooter(DATA) {
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
//-------------------------------------------BROWSER & FILTER--------------------------------------------
export function browser(DATA) {
    const searchInput = document.getElementById("searchInput");
    if (!searchInput) return;

    // Recupera la búsqueda si viene de otra página
    const query = localStorage.getItem("searchQuery");
    if (query) {
        searchInput.value = query;
        localStorage.removeItem("searchQuery");
        filtrar(query, DATA); // filtra automáticamente al cargar
    }

    // Filtra en tiempo real mientras escribe
    searchInput.addEventListener("input", () => {
        filtrar(searchInput.value, DATA);
    });

    // Al pulsar Enter redirige
    searchInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            const texto = searchInput.value.trim();
            if (texto) {
                localStorage.setItem("searchQuery", texto);
                window.location.href = "../Paginas/centers.html";
            }
        }
    });
}

function filtrar(texto, DATA) {
    texto = texto.toLowerCase();

    const specialtySections = document.querySelectorAll("main.specialidad .specialty-section");
    specialtySections.forEach((section, index) => {
        const specialty = DATA.specialities.Especialidades[index];
        if (!specialty) return;
        const coincide = specialty.name.toLowerCase().includes(texto) ||
            specialty.desc.toLowerCase().includes(texto);
        section.style.display = coincide ? "" : "none";
    });

    const centerSections = document.querySelectorAll("main.center");
    centerSections.forEach((section, index) => {
        const center = DATA.centers[index];
        if (!center) return;
        const coincide = center.name.toLowerCase().includes(texto) ||
            center.description.toLowerCase().includes(texto);
        section.style.display = coincide ? "" : "none";
    });
}