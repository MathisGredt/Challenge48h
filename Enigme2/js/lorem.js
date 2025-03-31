document.addEventListener('DOMContentLoaded', function() {
    const codeButtons = document.querySelectorAll('.code-btn');
    const codeEntry = document.getElementById('code-entry');
    const clearButton = document.getElementById('clear-code');
    const validateButton = document.getElementById('validate-code');
    let enteredCode = '';

    // Ajouter un événement de clic sur chaque bouton de code
    codeButtons.forEach(button => {
        button.addEventListener('click', function() {
            enteredCode += this.getAttribute('data-value');
            codeEntry.textContent = 'Code: ' + enteredCode;
        });
    });

    // Effacer le code
    clearButton.addEventListener('click', function() {
        enteredCode = '';
        codeEntry.textContent = 'Code: ';
    });

    // Vérifier le code lorsque le bouton "Valider" est cliqué
    validateButton.addEventListener('click', function() {
        if (enteredCode === 'MARCUS') {
            window.location.href = 'rickroll.html';
        } else if (enteredCode === 'MUSIC') {
            window.location.href = 'music.html';
        } else {
            alert('Code incorrect, essayez encore.');
        }
    });
});
