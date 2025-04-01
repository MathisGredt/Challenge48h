document.addEventListener('DOMContentLoaded', function() {
    const codeButtons = document.querySelectorAll('.code-btn');
    const codeEntry = document.getElementById('code-entry');
    const clearButton = document.getElementById('clear-code');
    const validateButton = document.getElementById('validate-code');
    const buttonsContainer = document.getElementById('buttons-container');
    const actionButtons = document.querySelector('.action-buttons');
    let enteredCode = '';
    
    function fadeInElements(elements, delay = 200) {
        elements.forEach((el, index) => {
            setTimeout(() => {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, index * delay);
        });
    }

    function typeWriterEffect(element, text, speed, callback = null) {
        element.innerHTML = "";
        let i = 0;

        function type() {
            if (i < text.length) {
                element.innerHTML += text[i];
                i++;
                setTimeout(type, speed);
            } else if (callback) {
                callback();
            }
        }

        type();
    }

    const successText = `Ce qui est caché l'est parfois moins qu'on le croit ...

                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do 
                                eiusmod tempor incididunt ut labore music et dolore magna aliqua. 
                                Music Ut enim ad minim veniam, quis nostrud exercitation ullamco 
                                laboris nisi ut aliquip ex music ea commodo consequat. Duis aute irure 
                                dolor in reprehenderit in voluptate music velit esse cillum dolore eu 
                                fugiat nulla pariatur.`;

    const successParagraph = document.getElementById("hidden-text");
    typeWriterEffect(successParagraph, successText.toUpperCase(), 10, function() {
        fadeInElements([codeEntry, ...codeButtons, clearButton, validateButton]);
    });

    codeButtons.forEach(button => {
        button.addEventListener('click', function() {
            enteredCode += this.getAttribute('data-value');
            codeEntry.textContent = 'Code: ' + enteredCode;
        });
    });

    clearButton.addEventListener('click', function() {
        enteredCode = '';
        codeEntry.textContent = 'Code: ';
    });

    validateButton.addEventListener('click', function() {
        if (enteredCode === 'MARCUS') {
            window.location = '/enigme3/rickroll';
        } else if (enteredCode === 'MUSIC') {
            window.location = '/enigme3/part3';
        } else {
            alert('Code incorrect, essayez encore.');
        }
    });

    // Initialisation des éléments invisibles (à faire apparaître après l'effet typewriter)
    codeEntry.style.opacity = '0';
    codeEntry.style.transform = 'translateY(10px)';
    codeEntry.style.transition = 'opacity 0.2s ease-out, transform 0.2s ease-out';

    codeButtons.forEach(button => {
        button.style.opacity = '0';
        button.style.transform = 'translateY(10px)';
        button.style.transition = 'opacity 0.2s ease-out, transform 0.2s ease-out';
    });

    clearButton.style.opacity = '0';
    clearButton.style.transform = 'translateY(10px)';
    clearButton.style.transition = 'opacity 0.2s ease-out, transform 0.2s ease-out';

    validateButton.style.opacity = '0';
    validateButton.style.transform = 'translateY(10px)';
    validateButton.style.transition = 'opacity 0.2s ease-out, transform 0.2s ease-out';
});
