if (sessionStorage.getItem("ShowError") === null) {
    sessionStorage.setItem("ShowError", "true");
}

function updatePage() {
    const showError = sessionStorage.getItem("ShowError") === "true";
    const contentDiv = document.getElementById("content");

    if (showError) {
        contentDiv.innerHTML = `
                    <div class="error-container">
                        <h1>FATAL ERROR - SESSION CORRUPTED</h1>
                        <p>
                            SYSTEM FAILURE DETECTED...
                            Attempting recovery...
                            ERROR CODE: 0xC000021A
                            MEMORY DUMP IN PROGRESS...
                            SYSTEM SHUTDOWN INITIATED.
                            CONTACT ADMINISTRATOR FOR ASSISTANCE.
                        </p>
                    </div>`;
    } else {
        contentDiv.innerHTML = `
                    <div class="success-container">
                        <h1>SUCCESS - ACCESS GRANTED</h1>
                        <p>
                            SYSTEM AUTHENTICATION COMPLETE...
                            USER VERIFICATION: PASSED
                            INITIALIZING MAIN SYSTEM...
                            LOADING TRUE CHALLENGE...
                            
                            YOU HAVE NOW FINISHED THE TUTORIAL,
                            YOU CAN START THE TRUE CHALLENGE !
                        </p>
                        <button onclick="startChallenge()">Start True Challenge</button>
                    </div>`;
    }
}

function startChallenge() {
    alert("POISSON D'AVRIL ! AHAHAHAHAHAHAHAHA");
}

window.addEventListener("storage", updatePage);
setInterval(updatePage, 500);

updatePage();