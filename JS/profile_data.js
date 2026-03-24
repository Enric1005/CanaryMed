//-------------------------------------------PERFIL--------------------------------------------
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

//-------------------------------------------SECCIONES(FAVS, HIS, CITAS)--------------------------------------------
export function loadSeccion(DATA) {
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
