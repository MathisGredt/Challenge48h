const canvas = document.getElementById('mazeCanvas');
const ctx = canvas.getContext('2d');
const playerElement = document.getElementById('player');

const size = Math.min(window.innerWidth, window.innerHeight) * 0.8;
canvas.width = size;
canvas.height = size;

canvas.style.position = 'absolute';
canvas.style.left = '50%';
canvas.style.top = '50%';
canvas.style.transform = 'translate(-50%, -50%)';

const gridSize = 15;
const cellSize = size / gridSize;
const wallWidth = 2;

const visionRadius = 2.5;
const lightRadius = cellSize * 2.5;

let playerCell = { x: 0, y: 0 };
let isMoving = false;

let maze = [];

function initMaze() {
    maze = [];
    for (let x = 0; x < gridSize; x++) {
        maze[x] = [];
        for (let y = 0; y < gridSize; y++) {
            maze[x][y] = [true, true];
        }
    }
    generateMaze();
    playerCell = { x: 0, y: 0 };
    updatePlayerPosition();
}

function generateMaze() {
    let stack = [];
    let visited = Array(gridSize).fill().map(() => Array(gridSize).fill(false));
    let x = 0, y = 0;
    visited[x][y] = true;
    stack.push({ x, y });
    const dx = [1, 0, -1, 0];
    const dy = [0, 1, 0, -1];
    while (stack.length > 0) {
        const current = stack[stack.length - 1];
        x = current.x;
        y = current.y;
        let neighbors = [];
        for (let i = 0; i < 4; i++) {
            const nx = x + dx[i];
            const ny = y + dy[i];
            if (nx >= 0 && nx < gridSize && ny >= 0 && ny < gridSize && !visited[nx][ny]) {
                neighbors.push({ x: nx, y: ny, dir: i });
            }
        }
        if (neighbors.length > 0) {
            const next = neighbors[Math.floor(Math.random() * neighbors.length)];
            if (next.dir === 0) maze[x][y][0] = false;
            else if (next.dir === 1) maze[x][y][1] = false;
            else if (next.dir === 2) maze[next.x][next.y][0] = false;
            else if (next.dir === 3) maze[next.x][next.y][1] = false;
            visited[next.x][next.y] = true;
            stack.push({ x: next.x, y: next.y });
        } else {
            stack.pop();
        }
    }
    maze[0][0][0] = false;
    maze[gridSize - 1][gridSize - 1][1] = false;
}

function drawMaze() {
    ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--bg-color');
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    const playerX = (playerCell.x + 0.5) * cellSize;
    const playerY = (playerCell.y + 0.5) * cellSize;
    ctx.save();
    ctx.beginPath();
    ctx.arc(playerX, playerY, lightRadius, 0, Math.PI * 2);
    ctx.clip();
    const minX = Math.max(0, playerCell.x - Math.ceil(visionRadius));
    const maxX = Math.min(gridSize - 1, playerCell.x + Math.ceil(visionRadius));
    const minY = Math.max(0, playerCell.y - Math.ceil(visionRadius));
    const maxY = Math.min(gridSize - 1, playerCell.y + Math.ceil(visionRadius));
    for (let x = minX; x <= maxX; x++) {
        for (let y = minY; y <= maxY; y++) {
            const dist = Math.sqrt(Math.pow(x - playerCell.x, 2) + Math.pow(y - playerCell.y, 2));
            if (dist > visionRadius) continue;
            const cellX = x * cellSize;
            const cellY = y * cellSize;
            const alpha = 1 - (dist / visionRadius) * 0.7;
            ctx.fillStyle = `rgba(0, 17, 51, ${alpha})`;
            ctx.fillRect(cellX, cellY, cellSize, cellSize);
            ctx.strokeStyle = `rgba(68, 136, 255, ${alpha})`;
            ctx.lineWidth = wallWidth;
            if (maze[x][y][0]) {
                ctx.beginPath();
                ctx.moveTo(cellX + cellSize, cellY);
                ctx.lineTo(cellX + cellSize, cellY + cellSize);
                ctx.stroke();
            }
            if (maze[x][y][1]) {
                ctx.beginPath();
                ctx.moveTo(cellX, cellY + cellSize);
                ctx.lineTo(cellX + cellSize, cellY + cellSize);
                ctx.stroke();
            }
            if (x === 0) {
                ctx.beginPath();
                ctx.moveTo(cellX, cellY);
                ctx.lineTo(cellX, cellY + cellSize);
                ctx.stroke();
            }
            if (y === 0) {
                ctx.beginPath();
                ctx.moveTo(cellX, cellY);
                ctx.lineTo(cellX + cellSize, cellY);
                ctx.stroke();
            }
        }
    }
    if (playerCell.x === gridSize - 1 && playerCell.y === gridSize - 1) {
        const exitX = (gridSize - 1) * cellSize + cellSize / 2;
        const exitY = (gridSize - 1) * cellSize + cellSize / 2;
        ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--goal-color');
        ctx.beginPath();
        ctx.arc(exitX, exitY, cellSize / 4, 0, Math.PI * 2);
        ctx.fill();
    }
    ctx.restore();
}

function canMove(newX, newY) {
    if (newX < 0 || newX >= gridSize || newY < 0 || newY >= gridSize) {
        return false;
    }
    if (newX > playerCell.x) {
        return !maze[playerCell.x][playerCell.y][0];
    }
    if (newX < playerCell.x) {
        return !maze[newX][newY][0];
    }
    if (newY > playerCell.y) {
        return !maze[playerCell.x][playerCell.y][1];
    }
    if (newY < playerCell.y) {
        return !maze[newX][newY][1];
    }
    return true;
}

function updatePlayerPosition() {
    const canvasRect = canvas.getBoundingClientRect();
    const playerX = canvasRect.left + (playerCell.x + 0.5) * cellSize;
    const playerY = canvasRect.top + (playerCell.y + 0.5) * cellSize;
    playerElement.style.left = `${playerX}px`;
    playerElement.style.top = `${playerY}px`;
    if (playerCell.x === gridSize - 1 && playerCell.y === gridSize - 1) {
    
            alert("Bravo ! retenez bien : YKG");
            window.location.href = "/Enigme1/html/e1p3.html";
        
    }
}

document.addEventListener('keydown', (e) => {
    if (isMoving) return;
    let newX = playerCell.x;
    let newY = playerCell.y;
    switch (e.key) {
        case 'ArrowUp':
            newY--;
            break;
        case 'ArrowDown':
            newY++;
            break;
        case 'ArrowLeft':
            newX--;
            break;
        case 'ArrowRight':
            newX++;
            break;
        default:
            return;
    }
    if (canMove(newX, newY)) {
        isMoving = true;
        playerCell.x = newX;
        playerCell.y = newY;
        updatePlayerPosition();
        setTimeout(() => {
            isMoving = false;
        }, 200);
    }
});

initMaze();

function gameLoop() {
    drawMaze();
    requestAnimationFrame(gameLoop);
}

window.addEventListener('resize', () => {
    const size = Math.min(window.innerWidth, window.innerHeight) * 0.8;
    canvas.width = size;
    canvas.height = size;
    updatePlayerPosition();
});

gameLoop();