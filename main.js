const button = document.getElementsByClassName("btnFuyant");

document.addEventListener("mousemove", (event) => {
    const mouseX = event.clientX;
    const mouseY = event.clientY;
    const btnRect = button.getBoundingClientRect();
    const btnX = btnRect.left + btnRect.width / 2;
    const btnY = btnRect.top + btnRect.height / 2;

    const distance = Math.hypot(mouseX - btnX, mouseY - btnY);

    if (distance < 130) {
        const angle = Math.atan2(btnY - mouseY, btnX - mouseX);
        const moveX = Math.cos(angle) * 400; 
        const moveY = Math.sin(angle) * 400;

        button.style.transform = `translate(${moveX}px, ${moveY}px)`;
    }
});