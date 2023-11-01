// script.js

const board = document.getElementById('tic-tac-toe-board');
const message = document.getElementById('message');
const newGameButton = document.getElementById('new-game-button');
let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameOver = false;

function checkWinner() {
    const winningCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    for (const combo of winningCombos) {
        const [a, b, c] = combo;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            return gameBoard[a];
        }
    }

    if (!gameBoard.includes('')) {
        return 'draw';
    }

    return null;
}

function handleClick(event) {
    const cell = event.target;
    const cellIndex = Array.from(board.children).indexOf(cell);

    if (gameBoard[cellIndex] === '' && !gameOver) {
        gameBoard[cellIndex] = currentPlayer;
        cell.textContent = currentPlayer;
        cell.classList.add(currentPlayer === 'X' ? 'x' : 'o');
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        message.textContent = `Player ${currentPlayer}'s turn`;

        const winner = checkWinner();
        if (winner) {
            if (winner === 'draw') {
                message.textContent = 'It\'s a draw!';
            } else {
                message.textContent = `Player ${winner} wins!`;
            }
            gameOver = true;
        }
    }
}

function createBoard() {
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        board.appendChild(cell);
        cell.addEventListener('click', handleClick);
    }
}

function resetGame() {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameOver = false;
    message.textContent = 'Player X\'s turn';
    Array.from(document.querySelectorAll('.cell')).forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('x', 'o');
    });
}

createBoard();

newGameButton.addEventListener('click', resetGame);
