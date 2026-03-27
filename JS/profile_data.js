
export function loadProfile(DATA) {
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

// Secciones (Citas pendientes, Historial, Favoritos)
export function loadSeccion(DATA) {
    if (!DATA?.perfil?.secciones) return;

    const key = localStorage.getItem("seccionActiva");
    const seccion = DATA.perfil.secciones.find(s => s.key === key);
    const titulo = document.querySelector(".text-section3 .text-header h1");

    if (titulo && seccion) titulo.textContent = seccion.titulo;

    const buton_back = document.querySelector(".text-section3 .text-header button");
    if(buton_back) buton_back.textContent = DATA.button_back;
}

export async function loadPendingAppointments() {
    const section = document.getElementById("profile_section1");

    let DATA = await fetch("../test_profile_data.json");
    DATA = await DATA.json();

    const body = section.querySelector(".card-body");
    body.innerHTML = DATA.pending_appointments.map(item => `
        <div class="appointment_preview">
            <p>${item.date} - ${item.speciality} - ${item.center}</p>
        </div>
    `).join("");
}

export async function loadRecord() {
    const section = document.getElementById("profile_section2");

    let DATA = await fetch("../test_profile_data.json");
    DATA = await DATA.json();

    const body = section.querySelector(".card-body");
    body.innerHTML = DATA.record.map(item => `
        <div class="appointment_preview">
            <p>${item.date} - ${item.speciality} - ${item.center}</p>
        </div>
    `).join("");
}

export async function loadFavoriteCenters() {
    const section = document.getElementById("profile_section3");

    let DATA = await fetch("../test_profile_data.json");
    DATA = await DATA.json();

    const body = section.querySelector(".card-body");
    body.innerHTML = DATA.favorite_centers.map(item => `
        <div class="appointment_preview">
            <p>${item.center} - ${item.speciality} - ${item.location}</p>
        </div>
    `).join("");
}

// Carga de información dentro de 'Ver más' para las citas pendientes
export async function seeMorePendingAppointments() {
    // 1. SOLO se ejecuta en profile (donde existen las secciones)
    const sections = document.querySelectorAll(".profile-sections > div");

    if (sections.length > 0) {
        sections.forEach(section => {
            const type = section.dataset.type;
            const link = section.querySelector(".section-link");
            if (link) link.href = `../Paginas/pending_appointments.html?type=${type}`;
        });
        return;
    }

    // 2. SOLO ejecutar en página de appointments
    const type = new URLSearchParams(location.search).get("type");
    if (type !== "pending") return;

    try {
        let DATA = await fetch(`../test_profile_data.json`);
        DATA = await DATA.json();

        const list = DATA.pending_appointments;

        const appointments = document.querySelectorAll(".appointment_block");
        appointments.forEach((appointment, i) => {
            const center = appointment.querySelector("p[data-type='center']");
            const speciality = appointment.querySelector("h4[data-type='speciality']");
            const date = appointment.querySelector("p[data-type='date']");

            if (!list[i]) return;
            center.textContent = list[i].center;
            speciality.textContent = list[i].speciality;
            date.textContent = list[i].date;
        });
    } catch (e) {alert("No se pudieron cargar los datos");}
}

// Carga de información dentro de 'Ver más' para las citas pendientes
export async function seeMoreRecord() {
    const sections = document.querySelectorAll(".profile-sections > div");

    if (sections.length > 0) {
        sections.forEach(section => {
            const type = section.dataset.type;
            const link = section.querySelector(".section-link");
            if (link) link.href = `../Paginas/pending_appointments.html?type=${type}`;
        });
        return;
    }

    const type = new URLSearchParams(location.search).get("type");
    if (type !== "record") return;
    try {
        let DATA = await fetch(`../test_profile_data.json`);
        DATA = await DATA.json();

        const list = DATA.record;

        const appointments = document.querySelectorAll(".appointment_block");
        appointments.forEach((appointment, i) => {
            const center = appointment.querySelector("p[data-type='center']");
            const speciality = appointment.querySelector("h4[data-type='speciality']");
            const date = appointment.querySelector("p[data-type='date']");

            if (!list[i]) return;
            center.textContent = list[i].center;
            speciality.textContent = list[i].speciality;
            date.textContent = list[i].date;
        });
    } catch (e) {alert("No se pudieron cargar los datos");}
}

export async function seeMoreFavoriteCenters() {
    const sections = document.querySelectorAll(".profile-sections > div");

    if (sections.length > 0) {
        sections.forEach(section => {
            const type = section.dataset.type;
            const link = section.querySelector(".section-link");
            if (link) link.href = `../Paginas/pending_appointments.html?type=${type}`;
        });
        return;
    }

    const type = new URLSearchParams(location.search).get("type");
    if (type !== "favorites") return;

    try {
        let DATA = await fetch(`../test_profile_data.json`);
        DATA = await DATA.json();

        const list = DATA.favorite_centers;

        const appointments = document.querySelectorAll(".appointment_block");
        appointments.forEach((appointment, i) => {
            const center = appointment.querySelector("p[data-type='center']");
            const speciality = appointment.querySelector("h4[data-type='speciality']");
            const location = appointment.querySelector("p[data-type='date']");

            if (!list[i]) return;
            center.textContent = list[i].center;
            speciality.textContent = list[i].speciality;
            location.textContent = list[i].location;
        });
    } catch (e) {alert("No se pudieron cargar los datos");}
}