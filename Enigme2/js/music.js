document.addEventListener("DOMContentLoaded", function () {
    const correctOrder = [2, 1, 4, 0, 3, 5];
    let originalOrder = [0, 1, 2, 3, 4, 5];
    const sounds = [
        new Audio('../assets/music/extrait_4.mp4'),
        new Audio('../assets/music/extrait_2.mp4'),
        new Audio('../assets/music/extrait_1.mp4'),
        new Audio('../assets/music/extrait_5.mp4'),
        new Audio('../assets/music/extrait_3.mp4'),
        new Audio('../assets/music/extrait_6.mp4')
    ];

    const container = document.getElementById("buttons-container");

    function renderButtons(order) {
        container.innerHTML = "";
        order.forEach((index, i) => {
            const button = document.createElement("button");
            button.innerText = `Extrait ${index + 1}`;
            button.dataset.index = i;
            button.draggable = true;
            button.addEventListener("dragstart", dragStart);
            button.addEventListener("dragover", dragOver);
            button.addEventListener("drop", drop);
            button.addEventListener("click", () => playSound(index));
            container.appendChild(button);
        });
    }

    function dragStart(event) {
        event.dataTransfer.setData("text", event.target.dataset.index);
    }

    function dragOver(event) {
        event.preventDefault();
    }

    function drop(event) {
        event.preventDefault();
        const draggedIndex = parseInt(event.dataTransfer.getData("text"));
        const targetIndex = parseInt(event.target.dataset.index);

        let temp = originalOrder[draggedIndex];
        originalOrder[draggedIndex] = originalOrder[targetIndex];
        originalOrder[targetIndex] = temp;

        renderButtons(originalOrder);
    }

    function playSound(index) {
        sounds[index].currentTime = 0;
        sounds[index].play();
    }

    function validateOrder() {
        if (JSON.stringify(originalOrder) === JSON.stringify(correctOrder)) {
            document.getElementById("result").innerText = "Bravo, vous avez trouvé le bon ordre !";
        } else {
            document.getElementById("result").innerText = "Mauvais ordre, essayez encore !";
            originalOrder = [0, 1, 2, 3, 4, 5];
            renderButtons(originalOrder);
        }
    }

    document.getElementById("validate").addEventListener("click", validateOrder);
    renderButtons(originalOrder);
});