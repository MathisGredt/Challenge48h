<<<<<<< HEAD
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
    const correctPassword = "votreMotDePasse";

    if (password === correctPassword) {
        showPopup("Mot de passe correct ! Redirection en cours...", "success");
        setTimeout(() => {
            window.location.href = "/success";
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
=======
const SECRET_PASSWORD = "vvlfrnctvvllib";
let audioContext = null;
let isPlaying = false;
let stopTimeout = null;

const morseCode = {
    'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..',
    'E': '.', 'F': '..-.', 'G': '--.', 'H': '....',
    'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..',
    'M': '--', 'N': '-.', 'O': '---', 'P': '.--.',
    'Q': '--.-', 'R': '.-.', 'S': '...', 'T': '-',
    'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
    'Y': '-.--', 'Z': '--..', ' ': '/'
};

const toggleBtn = document.getElementById('toggleMorseBtn');
toggleBtn.addEventListener('click', togglePlayback);

function togglePlayback() {
    if (isPlaying) {
        stopPlayback();
    } else {
        startPlayback();
    }
}

function startPlayback() {
    stopPlayback();
    
    isPlaying = true;
    toggleBtn.textContent = "⏹ Stop Morse Code";
    
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    let currentTime = audioContext.currentTime;
    let totalDuration = 0;

    for (const char of SECRET_PASSWORD.toUpperCase()) {
        const code = morseCode[char];
        if (!code) continue;

        for (const symbol of code) {
            const duration = symbol === '-' ? 0.3 : 0.1;
            playBeep(currentTime, duration);
            currentTime += duration + 0.1;
            totalDuration += duration + 0.1;
        }
        currentTime += 0.3;
        totalDuration += 0.3;
    }
    stopTimeout = setTimeout(() => {
        if (isPlaying) {
            stopPlayback();
        }
    }, totalDuration * 1000);
}

function playBeep(startTime, duration) {
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.type = 'sine';
    oscillator.frequency.value = 600;
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    gainNode.gain.setValueAtTime(0, startTime);
    gainNode.gain.linearRampToValueAtTime(1, startTime + 0.01);
    gainNode.gain.linearRampToValueAtTime(0, startTime + duration - 0.01);
    
    oscillator.start(startTime);
    oscillator.stop(startTime + duration);
}

function stopPlayback() {
    isPlaying = false;
    toggleBtn.textContent = "▶ Play Morse Code";
    
    if (stopTimeout) {
        clearTimeout(stopTimeout);
        stopTimeout = null;
    }
    
    if (audioContext) {
        audioContext.close().then(() => {
            audioContext = null;
        });
    }
}

function checkPassword() {
    const guess = document.getElementById('passwordGuess').value.trim().toUpperCase();
    const messageDiv = document.getElementById('message');

    if (guess === SECRET_PASSWORD.toUpperCase()) {
        messageDiv.textContent = "✅ Correct! The password was '" + SECRET_PASSWORD + "'.";
        messageDiv.className = "success";
    } else {
        messageDiv.textContent = "❌ Incorrect. Try again or ask for a hint!";
        messageDiv.className = "error";
    }
}

document.getElementById('checkPasswordBtn').addEventListener('click', checkPassword);
document.getElementById('passwordGuess').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') checkPassword();
});
>>>>>>> 9663fc276c0bf55a265cf70aad6f1f8bb68dc4bb
