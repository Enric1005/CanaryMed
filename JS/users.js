function register_user(usuario) {

    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    const existe = usuarios.find(u => u.email === usuario.email);

    if(existe){
        return false;
    }

    usuarios.push(usuario);

    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    localStorage.setItem("usuarioActivo", JSON.stringify(usuario));

    return true;
}

export function register_user_form() {
    const form = document.getElementById("login_form");

    if (!form) return;

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const nombre = document.getElementById("nombre").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        const user = {
            nombre: nombre,
            email: email,
            password: password,
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