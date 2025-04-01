const container = document.getElementById("movingContainer");
let x = 0;
let y = 0;
let dx = 2;
let dy = 2;
const containerWidth = 600;
const containerHeight = 400;
const windowWidth = window.innerWidth;
const windowHeight = window.innerHeight;

function moveContainer() {
    x += dx;
    y += dy;

    if (x + containerWidth > windowWidth || x < 0) {
        dx = -dx;
    }
    if (y + containerHeight > windowHeight || y < 0) {
        dy = -dy;
    }

    container.style.transform = `translate(${x}px, ${y}px)`;
    requestAnimationFrame(moveContainer);
}

moveContainer();