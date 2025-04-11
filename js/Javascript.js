const board = document.getElementById('board');
const winnerDiv = document.getElementById('winner');
const boardSizeSelector = document.getElementById('boardSize');

const images = {
    Red: 'img/Red.jpg', // Bild für Spieler Red
    Blue: 'img/Blue.jpg' // Bild für Spieler Blue
};

// Standardeinstellungen
let currentPlayer = 'Red'; // Zeigt an, welcher Spieler am Zug ist
let gameBoard = []; // Array, in dem der Spielzustand gespeichert wird
let boardSize = 3; // Standardgröße des Spielfeldes (3x3)
let winCondition = 3; // Anzahl zusammenhängender Symbole, die zum Sieg benötigt werden

function createBoard() {
    boardSize = parseInt(boardSizeSelector.value); // Holt die ausgewählte Größe des Spielfeldes
    winCondition = boardSize; // Setzt die Anzahl der zusammenhängenden Symbole basierend auf der gewählten Größe
    gameBoard = Array(boardSize * boardSize).fill(null); // Erstellt ein Array mit der Länge des Spielfelds und setzt alle Werte auf null
    
    // Erstellt das gleichmäßige Raster basierend auf der Spielfeldgröße
    board.style.gridTemplateColumns = `repeat(${boardSize}, 100px)`;
    board.style.gridTemplateRows = `repeat(${boardSize}, 100px)`;
    board.innerHTML = '';

    gameBoard.forEach((_, index) => { // Eine Schleife, die jede Position im Array durchläuft
        const cell = document.createElement('div'); // Für jede Zelle wird ein neues <div>-Element erstellt
        cell.classList.add('cell'); // Die neue Zelle bekommt die Klasse 'cell', um sie zu stylen
        cell.dataset.index = index; // Jede Zelle bekommt ein Attribut (data-index), um sie später zuzuordnen
        cell.addEventListener('click', handleMove); // Wartet auf einen Klick auf die Zelle und führt dann handleMove aus
        board.appendChild(cell); // Fügt die Zelle als Kind-Element dem Spielfeld hinzu
    });
}