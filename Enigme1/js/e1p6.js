document.addEventListener("mousemove", (event) => {
    const mouseX = event.clientX;
    const mouseY = event.clientY;
    const button = document.getElementById("btnFuyant");
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

document.getElementById("passwordInput").addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        event.preventDefault();
    }
});

document.getElementById("passwordForm").addEventListener("submit", (event) => {
    event.preventDefault();
    
    const password = document.getElementById("passwordInput").value;
    const correctPassword = "ZOWYKGKJH";

    if (password === correctPassword) {
        showPopup("Mot de passe correct ! Redirection en cours...", "success");
        setTimeout(() => {
            window.location.href = "/Enigme3/html/e3p1.html";
        }, 2000);
    } else {
        showPopup("Mot de passe incorrect. Réessaie !", "error");
    }
});

function showPopup(message, type) {
    const popup = document.getElementById("customPopup");
    const popupMessage = document.getElementById("popupMessage");
    popupMessage.textContent = message;

    popup.style.background = type === "success" ? "green" : "red";
    popup.style.display = "block";

    document.getElementById("closePopup").addEventListener("click", () => {
        popup.style.display = "none";
    });
}
