const digits = document.querySelectorAll('.digit');

digits.forEach(digit => {
  const upButton = digit.querySelector('.up');
  const downButton = digit.querySelector('.down');
  const valueSpan = digit.querySelector('.value');

  upButton.addEventListener('click', () => {
    let currentValue = parseInt(valueSpan.textContent);
    currentValue = (currentValue + 1) % 10;
    valueSpan.textContent = currentValue;
  });

  downButton.addEventListener('click', () => {
    let currentValue = parseInt(valueSpan.textContent);
    currentValue = (currentValue + 9) % 10;
    valueSpan.textContent = currentValue;
  });
});

function getCurrentCode() {
  const digitValues = document.querySelectorAll('.digit .value');
  let code = '';
  digitValues.forEach(digit => {
    code += digit.textContent;
  });
  return code;
}

document.getElementById('door_img').addEventListener('click', () => {
  const currentCode = getCurrentCode();
  console.log("Code entré :", currentCode);

  if (currentCode === "6249") {
    document.getElementById("door_img").src = "/enigme2/assets/img/door_open.png"
    document.getElementById("door_error").style.display = "none";
    document.getElementById("enter_button").style.display = "block";
  } else {
    document.getElementById("door_error").style.display = "block";
  }
});

const lantern = document.getElementById("lantern");
const parchment = document.getElementById("parchment");
const hiddenCode = document.getElementById("hidden-code");

let isDragging = false;

lantern.addEventListener("mousedown", () => {
  isDragging = true;
});

document.addEventListener("mousemove", (event) => {
  if (isDragging) {
    lantern.style.left = event.pageX - lantern.offsetWidth / 2 + "px";
    lantern.style.top = event.pageY - lantern.offsetHeight / 2 + "px";

    const lanternRect = lantern.getBoundingClientRect();
    const parchmentRect = parchment.getBoundingClientRect();

    if (
      lanternRect.left < parchmentRect.right &&
      lanternRect.right > parchmentRect.left &&
      lanternRect.top < parchmentRect.bottom &&
      lanternRect.bottom > parchmentRect.top
    ) {
      hiddenCode.style.opacity = 0.5;
    } else {
      hiddenCode.style.opacity = 0;
    }
  }
});

document.addEventListener("mouseup", () => {
  isDragging = false;
});
