export async function xLuIncludeFile() {
    const elements = document.getElementsByTagName("*");

    for (let i = 0; i < elements.length; i++) {
        const element = elements[i];
        const file = element.getAttribute("xlu-include-file");

        if (!file) continue;

        const clone = element.cloneNode(false);

        try {
            const response = await fetch(file);

            if (!response.ok) {
                console.warn(`No se pudo cargar el archivo: ${file} (${response.status})`);
                continue;
            }

            let content = await response.text();

            if (file === "article-template.html") {
                const articleData = {
                    title:        element.getAttribute("data-title"),
                    subtitle:     element.getAttribute("data-subtitle"),
                    date:         element.getAttribute("data-date"),
                    displayDate:  element.getAttribute("data-display-date"),
                    content:      element.getAttribute("data-content"),
                    image:        element.getAttribute("data-image") || "",
                    imageCaption: element.getAttribute("data-image-caption") || ""
                };

                for (const [key, value] of Object.entries(articleData)) {
                    content = content.replace(new RegExp(`{{${key}}}`, "g"), value);
                }
            }

            clone.removeAttribute("xlu-include-file");
            clone.innerHTML = content;
            element.parentNode.replaceChild(clone, element);

            await xLuIncludeFile();

        } catch (error) {
            console.error(`Error al cargar "${file}":`, error);
        }

        return;
    }

    const loader = document.getElementById("loader");
    if (loader) {
        loader.style.opacity = "0";
        setTimeout(() => loader.remove(), 300);
    }
}