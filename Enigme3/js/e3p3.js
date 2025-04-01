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
        messageDiv.textContent = "✅ Correct! Redirecting to the next page...";
        messageDiv.className = "success";

        setTimeout(() => {
            window.location.href = "/Enigme2/html/e2p1.html"; 
        }, 2000);
    } else {
        messageDiv.textContent = "❌ Incorrect. Try again or ask for a hint!";
        messageDiv.className = "error";
    }
}

document.getElementById('checkPasswordBtn').addEventListener('click', checkPassword);
document.getElementById('passwordGuess').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') checkPassword();
});