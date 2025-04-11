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

function handleMove(event) { // Reagiert, wenn eine Zelle angeklickt wird
    const index = event.target.dataset.index; // Holt den Index der angeklickten Zelle
    if (gameBoard[index] || checkWinner()) return; // Überprüft, ob die Zelle schon belegt ist oder ob das Spiel schon vorbei ist

    gameBoard[index] = currentPlayer; // Markiert die angeklickte Zelle mit dem aktuellen Spieler
    const img = document.createElement('img'); // Erstellt ein <img>-Element
    img.src = images[currentPlayer]; // Fügt das Bild des aktuellen Spielers ein
    event.target.appendChild(img); // Fügt das <img>-Element der angeklickten Zelle hinzu

    if (checkWinner()) { // Überprüft nach jedem Zug, ob ein Spieler gewonnen hat
        winnerDiv.textContent = `${currentPlayer} gewinnt!`;
        return;
    }

    currentPlayer = currentPlayer === 'Red' ? 'Blue' : 'Red'; // Wechsel des Spielers
}

// Überprüft, ob jemand gewonnen hat
function checkWinner() {
    const winningCombos = generateWinningCombos(); // Ruft die Funktion auf, um alle möglichen Gewinnkombinationen zu generieren

    return winningCombos.some(combo => { // Überprüft, ob mindestens eine Gewinnkombination erfüllt ist
        return combo.every(index => gameBoard[index] === currentPlayer); // Gibt true zurück, wenn eine Kombination vollständig erfüllt ist
    });
}

// Hilfe aus dem internet geholt
// Generiert alle möglichen Gewinnkombinationen
function generateWinningCombos() {
    const combos = []; // Array, in dem alle möglichen Gewinnkombinationen gespeichert werden

    // Reihen (Horizontal)
    for (let row = 0; row < boardSize; row++) { // Geht durch jede Zeile
        const combo = []; // Erstellt ein Array für jede Zeile
        for (let col = 0; col < boardSize; col++) { // Geht durch jede Spalte der Zeile
            combo.push(row * boardSize + col); // Berechnet den Index für die Zellen der aktuellen Zeile
        }
        combos.push(combo); // Fügt die Zeilenkombinationen zu den Gewinnkombinationen hinzu
    }

    // Spalten (Vertikal)
    for (let col = 0; col < boardSize; col++) { // Geht durch jede Spalte
        const combo = []; // Erstellt ein Array für jede Spalte
        for (let row = 0; row < boardSize; row++) { // Geht durch jede Zeile der Spalte
            combo.push(row * boardSize + col); // Berechnet den Index für die Zellen der aktuellen Spalte
        }
        combos.push(combo); // Fügt die Spaltenkombinationen zu den Gewinnkombinationen hinzu
    }
    
    // Diagonale 1 (von oben links nach unten rechts)
    const diagonal1 = [];
    for (let i = 0; i < boardSize; i++) {
        diagonal1.push(i * boardSize + i); // Berechnet die Indizes für die Zellen der ersten Diagonale
    }
    combos.push(diagonal1);

    // Diagonale 2 (von oben rechts nach unten links)
    const diagonal2 = [];
    for (let i = 0; i < boardSize; i++) {
        diagonal2.push((i + 1) * boardSize - (i + 1)); // Berechnet die Indizes für die Zellen der zweiten Diagonale
    }
    combos.push(diagonal2);

    return combos;
}
// Wechselt den Startspieler und zeigt eine Meldung an
function toggleStartingPlayer() {
    currentPlayer = currentPlayer === 'Red' ? 'Blue' : 'Red';
    alert(`Der Startspieler ist jetzt ${currentPlayer}`);
}

// Setzt das Spiel zurück
function resetGame() {
    winnerDiv.textContent = ''; // Der Gewinntext wird gelöscht
    createBoard(); // Erstellt das Spielfeld neu
}

createBoard(); // Erstellt das Spielfeld beim Laden der Seite