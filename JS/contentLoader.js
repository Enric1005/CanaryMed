//-------------------------------------------PEDIR UNA CITA--------------------------------------------
export function loadMakeAnAppointment(DATA) {

    const inputs = document.querySelectorAll("#formCita input");
    const selects = document.querySelectorAll("#formCita select");

    const title = document.querySelector("#title");
    if (title) title.textContent = DATA.make_an_appointment.title;

    const labels = document.querySelectorAll("#formCita label");
    labels.forEach((label, index) => {
        if (DATA.make_an_appointment.fields[index]) {
            label.textContent = DATA.make_an_appointment.fields[index].campo;
        }
    });

    inputs.forEach((input, index) => {
        if (DATA.make_an_appointment.fields[index]) {
            input.placeholder = DATA.make_an_appointment.fields[index].texto_ejemplo;
        }
    });

    const selectedCenter = localStorage.getItem("selectedCenter");
    const selectedSpecialty = localStorage.getItem("selectedSpecialty");

    // 🔹 AUTORELLENO INPUTS
    if (inputs[0] && selectedCenter) {
        inputs[0].value = selectedCenter;
    }

    if (inputs[1] && selectedSpecialty) {
        inputs[1].value = selectedSpecialty;
    }

    // 🔹 SELECTS (placeholder)
    selects.forEach((select, index) => {
        if (DATA.make_an_appointment.fields[index + inputs.length]) {
            select.options[0].textContent =
                DATA.make_an_appointment.fields[index + inputs.length].texto_ejemplo;
        }
    });

    // 🔹 CARGAR MÉDICOS DINÁMICAMENTE
    const selectMedico = selects[2];

    if (selectMedico && selectedCenter && selectedSpecialty) {

        selectMedico.innerHTML = "";

        const center = DATA.centers.find(c => c.name === selectedCenter);

        if (center) {
            const specialty = center.specialities.find(s => s.name === selectedSpecialty);

            if (specialty) {

                const doctors = Array.isArray(specialty.doctor)
                    ? specialty.doctor
                    : [specialty.doctor];

                doctors.forEach(doc => {
                    const option = document.createElement("option");
                    option.value = doc;
                    option.textContent = doc;
                    selectMedico.appendChild(option);
                });
            }
        }
    }

    const button = document.querySelector("#boton_confirmar");
    if (button) {
        button.textContent = DATA.make_an_appointment.boton_confirmar;
    }
}
//-------------------------------------------TRABAJA CON NOSOTROS--------------------------------------------
export function loadWorkWithUs(DATA){
    const workWithUsData = DATA.work_with_us;

    const workWithUsTitle = document.querySelector(".text-section .text-header h1");
    if(workWithUsTitle){
        workWithUsTitle.textContent = workWithUsData.title_page;
    }

    const workWithUsDescription = document.querySelector(".text-section p");
    if(workWithUsDescription){
        workWithUsDescription.textContent = workWithUsData.description;
    }

    const workWithUsButton = document.querySelector(".text-section .text-header .section-btn");
    if(workWithUsButton){
        workWithUsButton.textContent = DATA.button_back;
    }

    const workWithUsFormTitle = document.querySelector(".formulario h1");
    if(workWithUsFormTitle){
        workWithUsFormTitle.textContent = workWithUsData.form_title;
    }

    const workWithUsFormLabels = document.querySelectorAll(".formulario form label");
    const workWithUsFormInputs = document.querySelectorAll(".formulario form input");

    if(workWithUsFormLabels){
        workWithUsFormLabels.forEach(((label, index) => {
            label.textContent = workWithUsData.campos_formulario[index].campo;
        }))
    }
    if(workWithUsFormInputs){
        workWithUsFormInputs.forEach(((example_text, index) => {
            example_text.placeholder = workWithUsData.campos_formulario[index].texto_ejemplo;
        }))
    }
    const workWithUsFormSelect = document.querySelector(".formulario form select");
    if(workWithUsFormSelect){
        const options = DATA.work_with_us.campos_formulario[4].opciones;
        workWithUsFormSelect.appendChild(document.createElement("option"))
        options.forEach(o => {
            const option = document.createElement("option");
            option.textContent = o;
            workWithUsFormSelect.appendChild(option);
        })
    }

    const workWithUsFormButton = document.querySelector(".formulario .boton button");
    if(workWithUsFormButton){
        workWithUsFormButton.textContent = workWithUsData.buton_inscription
    }
}
//-------------------------------------------SOBRE NOSOTROS--------------------------------------------
export function loadAboutUs(DATA) {
    const aboutUsData = DATA.about_us;

    const aboutUsTitle = document.querySelector(".image-section h2");
    if (aboutUsTitle){
        aboutUsTitle.textContent = aboutUsData.title;
    }

    const aboutUsDescription = document.querySelector(".overlay p");
    if (aboutUsDescription){
        aboutUsDescription.textContent = aboutUsData.description;
    }
}
//-------------------------------------------ASISTENCIA CLIENTE--------------------------------------------
export function loadClientsAsist(DATA) {
    const title = document.querySelector("#main_asist_header h1");
    if (title) title.textContent = DATA.client_asist.title;

    const label = document.querySelector(".contenedor label[for='lorem01']");
    if (label) label.textContent = DATA.client_asist.campo_text;

    const textarea = document.querySelector("#lorem01");
    if (textarea) textarea.placeholder = DATA.client_asist.texto_ejemplo;

    const button = document.querySelector(".contenedor input[type='submit']");
    if (button) button.value = DATA.client_asist.boton;
}
