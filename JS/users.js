function register_user(usuario) {

    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    const existe = usuarios.find(u => u.correo === usuario.correo);

    if(existe){
        return false;
    }

    const passw_repetida = usuarios.find(u => u.password === usuario.password);
    if (passw_repetida){
        alert("Contraseña no válida");
        return false;
    }

    usuarios.push(usuario);

    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    localStorage.setItem("usuarioActivo", JSON.stringify(usuario));

    return true;
}

export function register_user_form() {
    const form = document.getElementById("register_form");

    if (!form) return;

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const terminos = document.querySelector("#mi-check");
        if (!terminos.checked) {
            alert("Acepte los terminos y condiciones");
            return;
        }

        const nombre = document.getElementById("nombre").value;
        const apellidos = document.getElementById("apellidos").value;
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

        const user = {
            nombre: nombre,
            apellidos: apellidos,
            correo: email,
            password: password,
            NIF: nif,
            telefono: telefono,
            favs: [],
            hist: [],
            citas: []
        }

        const creado = register_user(user);
        if (creado) {
            window.location.href = "../Paginas/profile.html";
        } else {
            alert("Usuario ya registrado");
        }
    })
}

export function log_in(){
    const form = document.getElementById("login_form");
    if (!form) return;

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        const usuario = usuarios.find(u => u.correo === email && u.password === password);

        if (!usuario) {
            alert("Usuario o contraseña incorrecta");
            return;
        }

        localStorage.setItem("usuarioActivo", JSON.stringify(usuario));
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