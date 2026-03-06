// JS para login y registro usando localStorage

// REGISTRO
function register(userData) {
    const { email, password } = userData;

    if (!email || !password) {
        alert("Por favor ingresa email y contraseña");
        return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || {};

    if (users[email]) {
        alert("Este usuario ya existe");
        return;
    }

    users[email] = { password };
    localStorage.setItem("users", JSON.stringify(users));

    alert("Registro exitoso");
    window.location.href = "profile.html"; // redirige al perfil
}

// LOGIN
function login(userData) {
    const { email, password } = userData;

    if (!email || !password) {
        alert("Por favor ingresa email y contraseña");
        return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || {};

    if (users[email] && users[email].password === password) {
        localStorage.setItem("loggedInUser", email);
        alert("Login exitoso");
        window.location.href = "profile.html"; // redirige al perfil
    } else {
        alert("Email o contraseña incorrectos");
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("loginForm");
    if (loginForm) {
        loginForm.addEventListener("submit", e => {
            e.preventDefault();
            const email = loginForm.querySelector('input[name="email"]').value;
            const password = loginForm.querySelector('input[name="password"]').value;
            login({ email, password });
        });
    }

    const registerForm = document.getElementById("registerForm");
    if (registerForm) {
        registerForm.addEventListener("submit", e => {
            e.preventDefault();
            const email = registerForm.querySelector('input[name="email"]').value;
            const password = registerForm.querySelector('input[name="password"]').value;
            register({ email, password });
        });
    }
});