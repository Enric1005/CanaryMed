//-------------------------------------------lOG_IN--------------------------------------------
export function loadLogin(DATA){
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

//-------------------------------------------REGISTRO/EDICIÓN--------------------------------------------
export function loadRegisterAndEdit(DATA){
    const edit_activo = localStorage.getItem("editMode") === "true";

    const labels = document.querySelectorAll("#register_form label:not(.chbox label)");
    labels.forEach((label, index) => {
        label.textContent = DATA.register_edit.fields[index].field;
    });

    if (edit_activo) {
        const usuario = JSON.parse(localStorage.getItem("usuarioActivo"));
        localStorage.removeItem("editMode");
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