const overlay = document.getElementById('overlay');
const batteryFill = document.getElementById('batteryFill');
const toggleFlashlightText = document.getElementById('toggle_text');

let flashlightActive = false;
let batteryLevel = 100;
const batteryDrainRate = 5;
const batteryRechargeRate = 2;

let lastMouseX = window.innerWidth / 2;
let lastMouseY = window.innerHeight / 2;

function updateBatteryDisplay() {
  batteryFill.style.width = batteryLevel + "%";
  if (batteryLevel > 50) {
    batteryFill.style.background = "green";
  } else if (batteryLevel > 20) {
    batteryFill.style.background = "orange";
  } else {
    batteryFill.style.background = "red";
  }
}

function updateFlashlight() {
  if (flashlightActive && batteryLevel > 0) {
    overlay.style.background = `radial-gradient(circle at ${lastMouseX}px ${lastMouseY}px, transparent 80px, rgba(0, 0, 0, 0.95) 120px)`;
  } else {
    overlay.style.background = 'rgba(0, 0, 0, 0.95)';
  }
}

document.addEventListener('keydown', (e) => {
  if (e.code === 'Space') {
    if (batteryLevel === 0) {
      return;
    }
    flashlightActive = !flashlightActive;
    toggleFlashlightText.textContent = flashlightActive ? "ETEINDRE" : "ALLUMER";
    updateFlashlight();
  }
});

document.addEventListener('mousemove', (e) => {
  lastMouseX = e.clientX;
  lastMouseY = e.clientY;
  if (flashlightActive && batteryLevel > 0) {
    updateFlashlight();
  }
});

setInterval(() => {
  if (flashlightActive) {
    if (batteryLevel > 0) {
      batteryLevel = Math.max(batteryLevel - batteryDrainRate, 0);
      if (batteryLevel === 0) {
        flashlightActive = false;
        toggleFlashlightText.textContent = "ALLUMER";
        overlay.style.background = `radial-gradient(circle at ${lastMouseX}px ${lastMouseY}px, rgba(0,0,0,0.8) 80px, rgba(0,0,0,0.95) 120px)`;
        setTimeout(() => {
          overlay.style.background = 'rgba(0, 0, 0, 0.95)';
        }, 200);
      }
    }
  }
  updateBatteryDisplay();
}, 300);

setInterval(() => {
  if (!flashlightActive && batteryLevel < 100) {
    batteryLevel = Math.min(batteryLevel + batteryRechargeRate, 100);
  }
  updateBatteryDisplay();
}, 400);