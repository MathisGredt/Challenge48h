const SECRET_PASSWORD = "987654321";
const hintBtn = document.getElementById('hintBtn');
const passwordInput = document.getElementById('passwordInput');
const submitBtn = document.getElementById('submitBtn');
const hint = document.getElementById('hint');
const hintPassword = document.getElementById('hintPassword');
const message = document.getElementById('message');

function moveHintButton() {
    const maxX = window.innerWidth - 100;
    const maxY = window.innerHeight - 50;
    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);
    
    hintBtn.style.position = 'absolute';
    hintBtn.style.left = `${randomX}px`;
    hintBtn.style.top = `${randomY}px`;
}

moveHintButton();

hintBtn.addEventListener('mouseover', moveHintButton);

hintBtn.addEventListener('click', function() {
    hintPassword.textContent = SECRET_PASSWORD;
    hint.style.display = 'block';
    hintBtn.style.display = 'none';
});

submitBtn.addEventListener('click', function(e) {
    e.preventDefault();
});

submitBtn.addEventListener('contextmenu', function(e) {
    e.preventDefault();
    
    const password = passwordInput.value;
    
    if (password === SECRET_PASSWORD) {
        message.textContent = "✅ Correct password! Access granted.";
        message.className = "success";
    } else {
        message.textContent = "❌ Wrong password! Try again.";
        message.className = "error";
    }
    
    return false;
});