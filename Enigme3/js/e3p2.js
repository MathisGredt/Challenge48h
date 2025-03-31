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
    const digits = document.querySelectorAll('.digit .value');
    let code = '';
    digits.forEach(digit => {
      code += digit.textContent;
    });
    return code;
  }
  
  document.getElementById('door_img').addEventListener('click', () => {
    const currentCode = getCurrentCode();
    console.log("Code entré :", currentCode);

    if (currentCode === "1234") {
      console.log("Porte ouverte !");
    } else {
      document.getElementById("door_error").style.display = "block";
    }
  });
  