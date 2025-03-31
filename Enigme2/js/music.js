document.addEventListener("DOMContentLoaded", function () {
    const correctOrder = [2, 1, 4, 0, 3]; // L'ordre final correct (5 extraits)
    let originalOrder = [0, 1, 2, 3, 4, 5]; // Tous les extraits au départ
    let unusedSound = null; // Stocke l'extrait inutile
    let currentPlayingSound = null;


    const sounds = [
        new Audio('../assets/music/extrait_4.mp4'),
        new Audio('../assets/music/extrait_2.mp4'),
        new Audio('../assets/music/extrait_1.mp4'),
        new Audio('../assets/music/extrait_5.mp4'),
        new Audio('../assets/music/extrait_3.mp4'),
        new Audio('../assets/music/extrait_6.mp4')
    ];

    const container = document.getElementById("buttons-container");
    const unusedContainer = document.getElementById("unused-container");

    function renderButtons(order) {
        container.innerHTML = "";
        order.forEach((index) => {
            const button = createButton(index);
            container.appendChild(button);
        });
    }

    function createButton(index) {
        const button = document.createElement("button");
        button.innerText = `Extrait ${index + 1}`;
        button.dataset.index = index;
        button.draggable = true;
        button.addEventListener("dragstart", dragStart);
        button.addEventListener("click", () => playSound(index));
        return button;
    }

    function dragStart(event) {
        event.dataTransfer.setData("text", event.target.dataset.index);
    }

    function enableDragAndDrop() {
        container.addEventListener("dragover", dragOver);
        container.addEventListener("drop", drop);

        unusedContainer.addEventListener("dragover", dragOverUnused);
        unusedContainer.addEventListener("drop", dropUnused);
    }

    function dragOver(event) {
        event.preventDefault();
    }

    function dragOverUnused(event) {
        event.preventDefault();
        unusedContainer.classList.add("dragover");
    }

    function drop(event) {
        event.preventDefault();
        const draggedIndex = parseInt(event.dataTransfer.getData("text"));

        if (originalOrder.includes(draggedIndex)) {
            const targetIndex = parseInt(event.target.dataset.index);
            if (!isNaN(targetIndex)) {
                let temp = originalOrder[originalOrder.indexOf(draggedIndex)];
                originalOrder[originalOrder.indexOf(draggedIndex)] = originalOrder[originalOrder.indexOf(targetIndex)];
                originalOrder[originalOrder.indexOf(targetIndex)] = temp;
                renderButtons(originalOrder);
            }
        }
    }

    function dropUnused(event) {
        event.preventDefault();
        unusedContainer.classList.remove("dragover");

        const draggedIndex = parseInt(event.dataTransfer.getData("text"));

        if (unusedSound === null && originalOrder.includes(draggedIndex)) {
            // Déplacer un extrait utile vers unused-container
            unusedSound = draggedIndex;
            originalOrder = originalOrder.filter(i => i !== draggedIndex); // Supprime de la séquence

            unusedContainer.innerHTML = ""; // On vide la div
            unusedContainer.appendChild(createButton(draggedIndex));

            renderButtons(originalOrder);
        } else if (unusedSound !== null && draggedIndex === unusedSound) {
            // L'utilisateur essaie de replacer l'extrait inutilisé dans la séquence
            unusedSound = null;
            originalOrder.push(draggedIndex);
            unusedContainer.innerHTML = "<h3>Extrait inutile</h3>";

            renderButtons(originalOrder);
        } else if (unusedSound !== null && originalOrder.includes(draggedIndex)) {
            // Échange entre un extrait utile et l'extrait inutile
            const temp = unusedSound;
            unusedSound = draggedIndex;
            originalOrder[originalOrder.indexOf(draggedIndex)] = temp;

            // Mise à jour des affichages
            unusedContainer.innerHTML = "";
            unusedContainer.appendChild(createButton(unusedSound));

            renderButtons(originalOrder);
        }
    }


    function playSound(index) {
        if (currentPlayingSound) {
            currentPlayingSound.pause(); // Arrêter le son en cours
            currentPlayingSound.currentTime = 0; // Remettre à 0
        }

        currentPlayingSound = sounds[index]; // Mettre à jour le son en cours
        currentPlayingSound.play();

        // Détecter la fin du son pour réinitialiser `currentPlayingSound`
        currentPlayingSound.onended = () => {
            currentPlayingSound = null;
        };
    }


    function validateOrder() {
        if (JSON.stringify(originalOrder) === JSON.stringify(correctOrder) && unusedSound !== null) {
            window.location.href = "../html/security.html";
        } else {
            document.getElementById("result").innerText = "Mauvais ordre ou extrait inutile mal placé, essayez encore !";
            resetGame();
        }
    }

    function resetGame() {
        originalOrder = [0, 1, 2, 3, 4, 5];
        unusedSound = null;
        unusedContainer.innerHTML = "<h3>Extrait inutile</h3>";
        renderButtons(originalOrder);
    }

    document.getElementById("validate").addEventListener("click", validateOrder);
    enableDragAndDrop();
    renderButtons(originalOrder);
});
