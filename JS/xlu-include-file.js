// https://stackoverflow.com/questions/40162907/w3includehtml-sometimes-includes-twice
/*
function xLuIncludeFile() {
    let z, i, a, file, xhttp;

    z = document.getElementsByTagName("*");

    for (i = 0; i < z.length; i++) {
        if (z[i].getAttribute("xlu-include-file")) {
            a = z[i].cloneNode(false);
            file = z[i].getAttribute("xlu-include-file");
            xhttp = new XMLHttpRequest();

            xhttp.onreadystatechange = function () {
                if (xhttp.readyState === 4 && xhttp.status === 200) {
                    a.removeAttribute("xlu-include-file");
                    a.innerHTML = xhttp.responseText;
                    z[i].parentNode.replaceChild(a, z[i]);
                    xLuIncludeFile();
                }
            }

            // false makes the send operation synchronous, which solves a problem
            // when using this function in short pages with Chrome. But it is
            // deprecated on the main thread due to its impact on responsiveness.
            // This call may end up throwing an exception someday.

            xhttp.open("GET", file, false);
            xhttp.send();

            return;
        }
    }
}
*/

async function xLuIncludeFile() {
    let z = document.getElementsByTagName("*");

    for (let i = 0; i < z.length; i++) {
        if (z[i].getAttribute("xlu-include-file")) {
            let a = z[i].cloneNode(false);
            let file = z[i].getAttribute("xlu-include-file");

            try {
                let response = await fetch(file);
                if (response.ok) {

                    let content = await response.text();

                    // Si el archivo es una plantilla, reemplazamos los placeholders
                    if (file === "article-template.html") {
                        let articleData = {
                            title: z[i].getAttribute("data-title"),
                            subtitle: z[i].getAttribute("data-subtitle"),
                            date: z[i].getAttribute("data-date"),
                            displayDate: z[i].getAttribute("data-display-date"),
                            content: z[i].getAttribute("data-content"),
                            image: z[i].getAttribute("data-image"),
                            imageCaption: z[i].getAttribute("data-image-caption")
                        };

                        content = content.replace(/{{title}}/g, articleData.title)
                            .replace(/{{subtitle}}/g, articleData.subtitle)
                            .replace(/{{date}}/g, articleData.date)
                            .replace(/{{displayDate}}/g, articleData.displayDate)
                            .replace(/{{content}}/g, articleData.content)
                            .replace(/{{image}}/g, articleData.image || '')
                            .replace(/{{imageCaption}}/g, articleData.imageCaption || '');
                    }


                    a.removeAttribute("xlu-include-file");
                    //a.innerHTML = await response.text();
                    a.innerHTML = content;
                    z[i].parentNode.replaceChild(a, z[i]);
                    xLuIncludeFile();
                }
            } catch (error) {
                console.error("Error fetching file:", error);
            }

            return;
        }
    }
}

document.addEventListener('DOMContentLoaded', async function() {
    loadDynamicContent();
});

async function loadDynamicContent() {
    let path = window.location.pathname;
    let routes = {
        'home_page.html': 'home'
    };

    let routeKey = Object.keys(routes).find(key => path.includes(key));
    let slug = routeKey ? routes[routeKey] : 'home';

    try {
        let response = await fetch("/tsconfig.json");
        let db = await response.json();
        let container = document.querySelector('#main');
        let page = db.data.find(p => p.slug === slug);

        if (page && container) {
            container.innerHTML = page.content.map(block =>
                block.children.map(child => child.text).join("")
            ).join("");

            await processSubTemplates(container);
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

async function processSubTemplates(dynamicContentSection) {
    let subElements = dynamicContentSection.querySelectorAll('[xlu-include-file]');

    for (let el of subElements) {
        let url = el.getAttribute('xlu-include-file');
        let response = await fetch(url);
        let html = await response.text();

        Object.keys(el.dataset).forEach(key => {
            let value = el.dataset[key];
            let regex = new RegExp(`{{${key}}}|__${key.toUpperCase()}__`, "g");
            html = html.replace(regex, value);
        });

        el.innerHTML = html;
        el.removeAttribute('xlu-include-file');
    }
}

document.addEventListener('DOMContentLoaded', async function () {
    await xLuIncludeFile();
    await loadDynamicContent();
});
