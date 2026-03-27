//-------------------------------------------CENTERS--------------------------------------------
export function loadCenters(DATA) {
    loadFilters("centers", DATA);
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

        const favInput = element.querySelector(".favorite input");
        const favLabel = element.querySelector(".favorite label");

        if (favInput && favLabel) {
            const favId = "fav-" + index;
            favInput.id = favId;
            favLabel.setAttribute("for", favId);
        }

        if (img) img.src = center.image;
        if (h1) h1.textContent = center.name;
        if (h3) h3.textContent = center.name;
        if (p) p.textContent = center.description;

        if (button) {
            button.textContent = DATA.boton_esp || "Ver más";
        }
    });
}

//-------------------------------------------SPECIALTYS--------------------------------------------
export function loadSpecialtys(DATA) {
    loadFilters("specialities", DATA);
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

//-------------------------------------------CENTER--------------------------------------------
export function loadCenter(DATA) {
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
                if (doctor) {
                    const doc = center.specialities[i].doctor;

                    if (Array.isArray(doc)) {
                        doctor.textContent = doc.map(d => d.name).join(", ");
                    } else {
                        doctor.textContent = doc;
                    }
                }

                const button = speciality.closest(".specialty_center-content")
                    .querySelector(".specialty_center-button");
                if (button) {
                    button.textContent = DATA.make_an_appointment.title;

                    button.addEventListener("click", () => {
                        localStorage.setItem("selectedCenter", center.name);
                        localStorage.setItem("selectedSpecialty", center.specialities[i].name);

                        window.location.href = "make_an_appointment.html";
                    });
                }
            }
        });
    }
}
//-------------------------------------------FILTROS--------------------------------------------
export function loadSpecialty(DATA) {
    const page = window.location.pathname.split("/").pop();

    // Si estamos en la lista de centros
    if (page === "specialtys.html") {
        const specialtyButtons = document.querySelectorAll('.specialty-section .specialty-content .specialty-button');
        console.log("Botones encontrados:", specialtyButtons.length);

        specialtyButtons.forEach((specialtyButtons, index) => {
            specialtyButtons.addEventListener('click', () => {
                localStorage.setItem("selectedSpecialtyIndex", index);
                window.location.href = "specialty_page.html";
            });
        });
    }

    // Si estamos en la página de un centro específico
    if (page === "specialty_page.html") {
        const index = localStorage.getItem("selectedSpecialtyIndex");
        if (index === null) return;

        const specialitie = DATA.specialitie[index];

        const buton_back = document.querySelector(".text-section4 .text-header button");
        if(buton_back) buton_back.textContent = DATA.button_back;

        const title = document.querySelector(".text-section4 .text-header h1");
        if(title) title.textContent = specialitie.name;

        const description = document.querySelector(".text-section4 p");
        if(description) description.textContent = specialitie.description;

        const container = document.getElementById("centers_container");
        if (!container) return;

        container.innerHTML = ""; // limpiar

        specialitie.centers.forEach(center => {

            const div = document.createElement("div");
            div.classList.add("specialty_center-section");

            div.innerHTML = `
                <div class="specialty_center-content">
                    <div class="specialty_center-image">
                        <img src="${center.image || ''}">
                    </div>
                    <div class="specialty_center-text">
                        <h1>${center.name}</h1>
                        <p data-type="price">${center.price}</p>
                        <p data-type="location">${center.location}</p>
                        <p data-type="doctor">${
                            Array.isArray(center.doctor)
                                ? center.doctor.map(d => d.name).join(", ")
                                : center.doctor
                        }</p>
                    </div>
                    <button class="specialty_center-button">
                        ${DATA.make_an_appointment.title}
                    </button>
                </div>
            `;
            const button = div.querySelector(".specialty_center-button");

            button.addEventListener("click", () => {
                localStorage.setItem("selectedCenter", center.name);
                localStorage.setItem("selectedSpecialty", specialitie.name);

                window.location.href = "../Paginas/make_an_appointment.html";
            });

            container.appendChild(div);
        });
    }
}
//-------------------------------------------FILTROS--------------------------------------------
export function loadFilters(type, DATA) {
    const filtersContainer = document.querySelector("main .filter_zone2");
    if (!filtersContainer) return;

    filtersContainer.innerHTML = "";

    let filterData = [];
    const buttonText = DATA.boton_filtro;

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

    if (type === "centers") {
        applyButton.addEventListener("click", () => {
            const checkboxes = filtersContainer.querySelectorAll(".filter_zone_ch");
            const filtrosActivos = Array.from(checkboxes)
                .filter(cb => cb.checked)
                .map(cb => cb.value);

            const centerSections = document.querySelectorAll("main.center");

            centerSections.forEach((section, index) => {
                const center = DATA.centers[index];
                if (!center) return;

                if (filtrosActivos.length === 0) {
                    section.style.display = "";
                    return;
                }

                // Filtros de precio y sitio por separado
                const filtrosPrecio = filtrosActivos.filter(f =>
                    ["Precio Bajo", "Precio Medio", "Precio Alto"].includes(f)
                );
                const filtrosSitio = filtrosActivos.filter(f =>
                    ["Norte", "Sur", "Ciudad"].includes(f)
                );

                const pasaPrecio = filtrosPrecio.length === 0 || filtrosPrecio.includes(center.precio);
                const pasaSitio  = filtrosSitio.length === 0  || filtrosSitio.includes(center.sitio);

                section.style.display = (pasaPrecio && pasaSitio) ? "" : "none";
            });
        });
    }
    if (type === "specialities") {
        applyButton.addEventListener("click", () => {
            const checkboxes = filtersContainer.querySelectorAll(".filter_zone_ch");
            const filtrosActivos = Array.from(checkboxes)
                .filter(cb => cb.checked)
                .map(cb => cb.value);

            const specialtySections = Array.from(document.querySelectorAll("main"))
                .filter(m => m.id !== "main_filter");

            specialtySections.forEach((section, index) => {
                const specialty = DATA.specialities.Especialidades[index];
                if (!specialty) return;

                console.log(`[${index}] desc: "${specialty.desc}" | filtros: ${JSON.stringify(filtrosActivos)}`);

                if (filtrosActivos.length === 0) {
                    section.style.display = "";
                    return;
                }

                section.style.display = filtrosActivos.includes(specialty.desc) ? "" : "none";
            });
        });
    }
}
