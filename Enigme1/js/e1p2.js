const container = document.getElementById("buttons-container");
const totalButtons = 1000;
const btnumb = Math.floor(Math.random() * totalButtons);

for (let i = 1; i < totalButtons; i++) {
    const button = document.createElement("button");
    button.textContent = `Bouton ${i}`;

    button.addEventListener("click", () => {
        if (i === btnumb) {
            button.style.backgroundColor = "#99ff99"; 
            button.textContent = "Gagné ! Cliquez pour continuer";

            button.addEventListener("click", () => {
                setTimeout(() => {
                    alert("Bravo ! retenez bien : Z");
                    window.location.href = "ep1p3.html";
                }, 5000);
            }, { once: true }); 
            
        } else {
            button.style.backgroundColor = "#ff9999";
            setTimeout(() => {
                button.style.backgroundColor = "#ddd";
            }, 300);
        }
    });

    container.appendChild(button);
}