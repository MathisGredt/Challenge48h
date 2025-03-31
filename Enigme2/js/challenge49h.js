if (sessionStorage.getItem("ShowError") === null) {
    sessionStorage.setItem("ShowError", "true");
}

function updatePage() {
    const showError = sessionStorage.getItem("ShowError") === "true";
    const contentDiv = document.getElementById("content");

    if (showError) {
        contentDiv.innerHTML = `
                    <div class="error-container">
                        <h1>Erreur de Session</h1>
                        <p>Une erreur fatale s'est produite. Veuillez vérifier les paramètres.</p>
                    </div>`;
    } else {
        contentDiv.innerHTML = `
                    <div class="success-container">
                        <h1>Bravo !</h1>
                        <p>Vous avez terminé le tutoriel, vous pouvez commencer le vrai challenge.</p>
                        <button onclick="startChallenge()">Start True Challenge</button>
                    </div>`;
    }
}

function startChallenge() {
    alert("Le vrai challenge commence maintenant !");
}

updatePage();