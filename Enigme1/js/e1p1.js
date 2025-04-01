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
                
                    alert("Bravo ! retenez bien : ZOW");
                    window.location.href = "/html/e1p2.html";
               
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