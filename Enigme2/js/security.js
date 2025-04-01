function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

window.onload = function() {
    setCookie("JeSuisCache", "/Challenge49h", 1);
}

const terminal = document.createElement("div");
terminal.classList.add("terminal");
document.body.appendChild(terminal);

const text = "SECURITY SYSTEM INITIALIZED...\nVERIFYING ACCESS...\nINGRÉDIENTS POUR LA RECETTE :\n- 250g de farine\n- 125g de beurre\n- 100g de sucre\n- 1 œuf\n- 1/2 sachet de levure\n- Pépites de chocolat\nMÉLANGE EN COURS...\nACCESS GRANTED\n";
let index = 0;

function typeEffect() {
    if (index < text.length) {
        terminal.innerHTML += text[index];
        index++;
        setTimeout(typeEffect, 50);
    } else {
        terminal.innerHTML += '<span class="cursor"></span>';
    }
}

typeEffect();