document.addEventListener("DOMContentLoaded", function () {
    let currentPassword = "Xzeg8eer6h8befr7teh5eb"; // Mot de passe initial
    const form = document.getElementById("loginForm");
    const passwordInput = document.getElementById("password");
    const errorMessage = document.getElementById("error-message");

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        if (passwordInput.value === currentPassword) {
            window.location = "/enigme3/part2";
            errorMessage.style.display = "none";
        } else {
            const errorMessages = [
                "Le mot de passe est incorrect",
                "This password is wrong",
                "Accès refusé,  le mot de passe est invalide",
                "Veuillez éssayer ultérieurement",

            ];
            let randomError = errorMessages[Math.floor(Math.random() * errorMessages.length)];

            // Afficher l'erreur
            errorMessage.textContent = randomError;
            errorMessage.style.display = "block";

            // Mettre à jour le mot de passe avec le dernier mot de l'erreur
            let words = randomError.split(" ");
            currentPassword = words[words.length - 1]; // Prend le dernier mot
        }
    });
});
