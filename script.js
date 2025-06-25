// Tic Tac Toe script

// Variables pour les images
const IMAGES = {
    bart: "/Tic Tac Toe/images/tete de bart.png",
    homer: "/Tic Tac Toe/images/tete de homer.jpeg"
};
const IMAGES_MODALS = {
    bart: "/Tic Tac Toe/images/bart win.png",
    homer: "/Tic Tac Toe/images/homer win.jpg",
    draw: "/Tic Tac Toe/images/draw.jpg"
};

// Variables de jeu
let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'bart';
let gameFinished = false;
let scoreBart = 0;
let scoreHomer = 0;

// Combinaisons gagnantes
const winningCombos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6] // Diagonals
];

// initialisation de la partie
function initGame() {
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        cell.addEventListener('click', playMove);
    });
}

// Fonction de jeu
function playMove(event) {
    const index = parseInt(event.target.dataset.index);

    if (board[index] !== '' || gameFinished) {
        return;
    }

    board[index] = currentPlayer;
    showCharacter(event.target, currentPlayer);

    if (checkWin()) {
        gameFinished = true;
        if (currentPlayer === 'bart') {
            scoreBart++;
            setTimeout(() => {
                const winnerName = currentPlayer === 'bart' ? 'Bart' : 'Homer';
                showModalWithImage(`${winnerName} wins!`, 'Aye Caramba!', 'bart');
            }, 800);
        } else {
            scoreHomer++;
            setTimeout(() => {
                const winnerName = currentPlayer === 'homer' ? 'Homer' : 'Bart';
                showModalWithImage(`${winnerName} wins!`, 'D\'oh!', 'homer');
            }, 800);
        }
        updateScores();
        highlightWinningCells();
    } else if (board.every(cell => cell !== '')) {
        gameFinished = true;
        setTimeout(() => {
            showModalWithImage('Draw! Nobody wins this time.', 'Draw!', 'draw');
        }, 500);
    } else {
        currentPlayer = currentPlayer === 'bart' ? 'homer' : 'bart';
        updateTurnDisplay();
    }
}

// Fonction pour afficher les personnages
function showCharacter(cell, character) {
    cell.innerHTML = '';

    const img = document.createElement('img');
    img.className = 'character-image';
    img.src = IMAGES[character];
    img.alt = character === 'bart' ? 'Bart Simpson' : 'Homer Simpson';

    img.onerror = function() {
        console.error(`Error loading image ${character}`);
        cell.innerHTML = `<div style="color: red; font-size: 12px; text-align: center;">Image<br>missing</div>`;
    };

    img.onload = function() {
        console.log(`Image ${character} loaded successfully`);
    };

    cell.appendChild(img);
}

// Fonctions gagnantes
function checkWin() {
    return winningCombos.some(combo => {
        return combo.every(index => {
            return board[index] === currentPlayer;
        });
    });
}

function highlightWinningCells() {
    const cells = document.querySelectorAll('.cell');

    winningCombos.forEach(combo => {
        if (combo.every(index => board[index] === currentPlayer)) {
            combo.forEach(index => {
                cells[index].classList.add('winner');
            });
        }
    });
}

function updateTurnDisplay() {
    const playerName = currentPlayer === 'bart' ? 'Bart' : 'Homer';
    document.getElementById('current-turn').textContent = `Turn: ${playerName}`;
}

function updateScores() {
    document.getElementById('bart-score').textContent = scoreBart;
    document.getElementById('homer-score').textContent = scoreHomer;
}

// Fonction des modales
function showModalWithImage(message, title, winner) {
    const modalContent = document.querySelector('.modal-content');
    modalContent.className = `modal-content ${winner}-theme victory custom-image`;

    let bgImage = '';
    if (winner === 'bart') {
        bgImage = IMAGES_MODALS.bart;
    } else if (winner === 'homer') {
        bgImage = IMAGES_MODALS.homer;
    } else if (winner === 'draw') {
        bgImage = IMAGES_MODALS.draw;
    }
    modalContent.style.backgroundImage = `url('${bgImage}')`;
    modalContent.style.backgroundSize = 'cover';
    modalContent.style.backgroundPosition = 'center';

    document.getElementById('modal-title').textContent = title;
    document.getElementById('modal-message').textContent = message;
    document.getElementById('modal').style.display = 'flex';
}
function closeModal() {
    document.getElementById('modal').style.display = 'none';
    resetGame();
}
function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'bart';
    gameFinished = false;
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        cell.innerHTML = '';
        cell.classList.remove('winner');
    });
    updateTurnDisplay();
}

// Initialisation
document.addEventListener('DOMContentLoaded', initGame);