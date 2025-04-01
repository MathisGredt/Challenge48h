const SECRET_PASSWORD = "987654321";
const hintBtn = document.getElementById('hintBtn');
const passwordInput = document.getElementById('passwordInput');
const submitBtn = document.getElementById('submitBtn');
const hint = document.getElementById('hint');
const hintPassword = document.getElementById('hintPassword');
const message = document.getElementById('message');

let posX = Math.random() * (window.innerWidth - hintBtn.offsetWidth);
let posY = Math.random() * (window.innerHeight - hintBtn.offsetHeight);
let velocityX = 2;
let velocityY = 2;
let isMoving = true;

function animate() {
    if (!isMoving) return;

    posX += velocityX;
    posY += velocityY;

    if (posX <= 0 || posX >= window.innerWidth - hintBtn.offsetWidth) {
        velocityX = -velocityX;
    }
    if (posY <= 0 || posY >= window.innerHeight - hintBtn.offsetHeight) {
        velocityY = -velocityY;
    }

    hintBtn.style.position = 'absolute';
    hintBtn.style.left = `${posX}px`;
    hintBtn.style.top = `${posY}px`;

    requestAnimationFrame(animate);
}

animate();

hintBtn.addEventListener('click', function() {
    isMoving = false;
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
        alert("Bravo ! retenez bien : KJH");
        window.location.href = "/Enigme1/html/e1p6.html";
    } else {
        message.textContent = "❌ Wrong password! Try again.";
        message.className = "error";
    }
    
    return false;
});

window.addEventListener('resize', function() {

    posX = Math.min(posX, window.innerWidth - hintBtn.offsetWidth);
    posY = Math.min(posY, window.innerHeight - hintBtn.offsetHeight);
});