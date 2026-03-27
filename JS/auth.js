async function getData() {
    const response = await fetch("../test_profile_data.json");
    return await response.json();
}

export function register_user_form() {
    const form = document.getElementById("register_form");

    if (!form) return;

    form.addEventListener("submit", async(e) => {
        e.preventDefault();
        const data = await getData();

        const terminos = document.querySelector("#mi-check");
        if (!terminos.checked) {
            alert("Acepte los terminos y condiciones");
            return;
        }
        const email = document.getElementById("email").value;
        const email_confirm = document.getElementById("email_confirm").value;
        if (email !== email_confirm) {
            alert("Los correos no coinciden");
            return;
        }

        const password = document.getElementById("password").value;
        const password_confirmed = document.getElementById("password_confirmed").value;
        if (password !== password_confirmed) {
            alert("Las contraseñas no coinciden");
            return;
        }

        const nif = document.getElementById("NIF").value;
        const telefono = document.getElementById("tel").value;

        const nif_confirm = data.NIF;
        const email_confirmed = data.email;
        const telefono_confirm = data.phone;

        const regex = /^\d{8}[A-Z]$/;
        let valido = regex.test(nif);
        if (!valido) {
            alert("Formato incorrecto");
            return;
        }

        const passwordRegex = /^(?=.*[A-Za-z])(?=.*[^A-Za-z0-9]).{8,}$/;
        valido = regex.test(passwordRegex);
        if (!valido) {
            alert("Formato incorrecto");
            return;
        }

        if (nif !== nif_confirm || telefono !== telefono_confirm || email !== email_confirmed) {
            alert("Usuario ya registrado");
            return;
        }
    })
}

export function log_in(){

    const form = document.getElementById("login_form");
    if (!form) return;

    form.addEventListener("submit", async(e) => {
        e.preventDefault();

        const data = await getData();

        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        const email_confirm = data.email;
        const password_confirmed = data.password;

        if (email !== email_confirm || password !== password_confirmed) {
            alert("Usuario o contraseña incorrecta");
            return;
        }

        localStorage.setItem("usuarioActivo", "true");
        window.location.href = "../Paginas/profile.html";
    });
}

export function log_out() {
    const btn = document.getElementById("log_out_btn");
    if (!btn) return;

    btn.addEventListener("click", (e) => {
        e.preventDefault();
        localStorage.removeItem("usuarioActivo");
        window.location.href = "../Paginas/home_page.html";
    })
}