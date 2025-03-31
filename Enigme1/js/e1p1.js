const button = document.getElementById("btnFuyant");
const passwordInput = document.getElementById("passwordInput");
const correctPassword = "Cyril > Allan"; 

button.addEventListener("click", () => {
    const enteredPassword = passwordInput.value;

    if (enteredPassword === correctPassword) {
        
        window.location.href = "/Enigme2/ep2p1.html";
    } else {
        
        alert("Mot de passe incorrect. Veuillez réessayer.");
    }
});

document.addEventListener("mousemove", (event) => {
    const mouseX = event.clientX;
    const mouseY = event.clientY;
    const btnRect = button.getBoundingClientRect();
    const btnX = btnRect.left + btnRect.width / 2;
    const btnY = btnRect.top + btnRect.height / 2;

    const distance = Math.hypot(mouseX - btnX, mouseY - btnY);

    if (distance < 100) { 
        const angle = Math.atan2(btnY - mouseY, btnX - mouseX);
        const moveX = Math.cos(angle) * 500;
        const moveY = Math.sin(angle) * 450;

        button.style.transform = `translate(${moveX}px, ${moveY}px)`;
    }
});