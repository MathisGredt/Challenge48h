if (sessionStorage.getItem("ShowError") === null) {
    sessionStorage.setItem("ShowError", "true");
}

function typeWriterEffect(element, text, speed = 30) {
    element.innerHTML = "";
    let i = 0;

    function type() {
        if (i < text.length) {
            element.innerHTML += text[i];
            i++;
            setTimeout(type, speed);
        }
    }

    type();
}

function updatePage() {
    const showError = sessionStorage.getItem("ShowError") === "true";
    const contentDiv = document.getElementById("content");

    if (showError) {
        contentDiv.innerHTML = `
        <div class="error-container">
            <h1>FATAL ERROR - SESSION CORRUPTED</h1>
            <p id="error-text"></p>
        </div>`;

        const errorText = `SYSTEM FAILURE DETECTED...
Attempting recovery...
ERROR CODE: 0xC000021A
MEMORY DUMP IN PROGRESS...
SYSTEM SHUTDOWN INITIATED.
CONTACT ADMINISTRATOR FOR ASSISTANCE.`;

        const errorParagraph = document.getElementById("error-text");
        typeWriterEffect(errorParagraph, errorText, 30);
    } else {
        contentDiv.innerHTML = `
        <div class="success-container">
            <h1 id="success-title">SUCCESS - ACCESS GRANTED</h1>
            <p id="success-text"></p>
            <button onclick="startChallenge()">Start True Challenge</button>
        </div>`;

        const successText = `SYSTEM AUTHENTICATION COMPLETE...
USER VERIFICATION: PASSED
INITIALIZING MAIN SYSTEM...
LOADING TRUE CHALLENGE...

YOU HAVE NOW FINISHED THE TUTORIAL,
YOU CAN START THE TRUE CHALLENGE !`;

        const successParagraph = document.getElementById("success-text");
        typeWriterEffect(successParagraph, successText, 30);
    }
}

function startChallenge() {
    alert("POISSON D'AVRIL ! AHAHAHAHAHAHAHAHA");
}

let lastShowError = sessionStorage.getItem("ShowError");

setInterval(() => {
    const currentShowError = sessionStorage.getItem("ShowError");
    if (currentShowError !== lastShowError) {
        lastShowError = currentShowError;
        updatePage();
    }
}, 100);

updatePage();
