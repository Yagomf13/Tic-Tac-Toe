//------------------------------- Declarando Constantes -------------------------------//

const start1vs1 = document.getElementById("start1vs1");
const start1vsIA = document.getElementById("start1vsIA");
const restartButton1vs1 = document.getElementById("restartButton1vs1");
const restartButton1vsIA = document.getElementById("restartButton1vsIA");
const turno = document.getElementById("turno");
const buttons = document.querySelectorAll('#container button');

//-------------------------------------------------------------------------------------//

//------------------------------- Declarando Variables --------------------------------//

let player1;
let player2;
let currentPlayer;
let isVsIA = false;

let players = [
    { name: player1, number: 1 },
    { name: player2, number: 2 }
];

let tablero = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
];

//-------------------------------------------------------------------------------------//

buttons.forEach(button => {
    button.addEventListener('click', () => play(button));
});

//------------------------------------- Interface -------------------------------------//

//-------------------------------------------------------------------------------------//

// Initialize game state
function initializeGame() {
    currentPlayer = randomPlayer();
    turno.innerHTML = `Turno de ${currentPlayer.name}`;
    if (isVsIA && currentPlayer.name === "IA") {
        setTimeout(() => playIA(), 500); // IA faz o primeiro movimento
    }
}

initializeGame();

//#####################################################################################//
//#                              JUEGO PLAYER VS PLAYER                               #//
//#####################################################################################//

start1vs1.addEventListener("click", () => startGame(false)); //--> Start Button <--//

function play(button) {
    const row = button.dataset.row;
    const col = button.dataset.col;

    if (tablero[row][col] === 0) {
        tablero[row][col] = currentPlayer.number;
        button.textContent = currentPlayer.number === players[0].number ? 'X' : 'O';
        
        const resultado = verificarGanador(tablero);
        if (resultado !== 'No hay ganador') {
            turno.innerHTML = resultado;  
            buttons.forEach(button => button.disabled = true); // Desactivar botones
        } else {
            currentPlayer = playerSwitch(currentPlayer);
        }
    } else {
        alert("¡Espacio Ocupado!");
    }
}

//#####################################################################################//

//#####################################################################################//
//#                                JUEGO PLAYER VS IA                                 #//
//#####################################################################################//

start1vsIA.addEventListener("click", () => startGame(true)); //--> Start Button <--//

function playIA() {
    let row, col;
    do {
        row = Math.floor(Math.random() * 3);    
        col = Math.floor(Math.random() * 3);
    } while (tablero[row][col] !== 0);

    tablero[row][col] = currentPlayer.number;
    const button = document.querySelector(`button[data-row='${row}'][data-col='${col}']`);
    button.textContent = 'O'; // Asume que la IA es siempre el jugador 2 (O)

    const resultado = verificarGanador(tablero);
    if (resultado !== 'No hay ganador') {
        turno.innerHTML = resultado;
        buttons.forEach(button => button.disabled = true); // Desactivar botones
    } else {
        currentPlayer = playerSwitch(currentPlayer);
    }
}

//#####################################################################################//

function marcarGanador(casillas) {
    casillas.forEach(([row, col]) => {
        const button = document.querySelector(`button[data-row='${row}'][data-col='${col}']`);
        button.style.backgroundColor = "rgb(41, 26, 109)"; 
        button.style.color = "red";
    });
}

function endGame1vs1() {
    headerContainer.style.display = "block";
    restartButton1vsIA.style.display = "none";
    restartButton1vs1.style.display = "block";
    start1vsIA.style.display = "block";
    start1vs1.style.display = "none";
    container.style.display = "none";
    title.style.display = "none";
}

function endGame1vsIA() {
    headerContainer.style.display = "block";
    restartButton1vsIA.style.display = "block";
    restartButton1vs1.style.display = "none";
    start1vsIA.style.display = "none";
    start1vs1.style.display = "block";
    container.style.display = "none";
    title.style.display = "none";
}

//---------------------------------- Iniciar el juego ---------------------------------//

function restartGame() {
    // Reiniciar el tablero
    tablero = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
    ];

    // Restablecer los botones del tablero
    buttons.forEach(button => {
        button.innerHTML = '&nbsp;';
        button.style.backgroundColor = ""; 
        button.disabled = false;
        button.style.color = "white";
    });

    // Mostrar y ocultar los elementos necesarios
    restartButton1vs1.style.display = "none";
    headerContainer.style.display = "none";
    container1vs1.style.display = "block"; // Asegurar que el contenedor del tablero sea visible
    container.style.display = "grid"; // Asegurar que el contenedor del tablero use el grid layout

    // Initialize the game
    initializeGame();
}

//-------------------------------------------------------------------------------------//

restartButton1vs1.addEventListener("click", restartGame); //--> Event Listener a los Botones del Tablero <--//
restartButton1vsIA.addEventListener("click", restartGame); //--> Event Listener a los Botones del Tablero <--//

//---------------------------------- Iniciar el juego ---------------------------------//

function startGame(vsIA) {
    isVsIA = vsIA;
    player1 = prompt("Introduce el Nombre del 1º Jugador: ");
    player2 = isVsIA ? "IA" : prompt("Introduce el Nombre del 2º Jugador: ");

    //·········· Verificar si los nombres no son nulos o vacíos ··········//

    if (player1 && player2) { //--> Mostrar el Tablero y establecer el turno del primer jugador <--//
        headerContainer.style.display = "none";
        container1vs1.style.display = "block";
        players[0].name = player1;
        players[1].name = player2;

        // Initialize the game with new player names
        restartGame();
    } else {
        alert("Por favor, introduce un nombre para ambos jugadores.");
    }
}

//-------------------------------------------------------------------------------------//

//---------------------- Escoger Aleatóriamente el Primer Jugador ---------------------//

function randomPlayer() {
    return players[Math.floor(Math.random() * 2)];
}

//-------------------------------------------------------------------------------------//

//------------------------ Cambiar el Turno Entre los Jugadores -----------------------//

function playerSwitch(currentPlayer) {
    currentPlayer = currentPlayer.number === players[0].number ? players[1] : players[0];
    turno.innerHTML = `Turno de ${currentPlayer.name}`;
    
    if (isVsIA && currentPlayer.name === "IA") {
        setTimeout(() => playIA(), 500); // Añade un pequeño retraso para simular el pensamiento de la IA
    }

    return currentPlayer;
}

//-------------------------------------------------------------------------------------//

//---------------------------- Verificar Quien es el Ganador --------------------------//

function verificarGanador(tablero) {

    //·························· Verificar Filas y Columnas ···························//

    for (let i = 0; i < 3; i++) {

        if (tablero[i][0] === tablero[i][1] && tablero[i][1] === tablero[i][2]) { //----> Filas <----//
            if (tablero[i][0] !== 0) {
                marcarGanador([[i, 0], [i, 1], [i, 2]]);
                isVsIA ? setTimeout(endGame1vsIA, 2000) : setTimeout(endGame1vs1, 2000);
                return `${currentPlayer.name} gana`;
            }
        }

        if (tablero[0][i] === tablero[1][i] && tablero[1][i] === tablero[2][i]) { //--> Columnas <---//
            if (tablero[0][i] !== 0) {
                marcarGanador([[0, i], [1, i], [2, i]]);
                isVsIA ? setTimeout(endGame1vsIA, 2000) : setTimeout(endGame1vs1, 2000);
                return `${currentPlayer.name} gana`;
            }
        }
    }

    //·················································································//

    //····························· Verificar Diagonales ······························//

    if (tablero[0][0] === tablero[1][1] && tablero[1][1] === tablero[2][2]) { //--> D. Principal <---//
        if (tablero[0][0] !== 0) {
            marcarGanador([[0, 0], [1, 1], [2, 2]]);
            isVsIA ? setTimeout(endGame1vsIA, 2000) : setTimeout(endGame1vs1, 2000);
            return `${currentPlayer.name} gana`;
        }
    }
    if (tablero[0][2] === tablero[1][1] && tablero[1][1] === tablero[2][0]) { //--> D. Secundária <--//
        if (tablero[0][2] !== 0) {
            marcarGanador([[0, 2], [1, 1], [2, 0]]);
            isVsIA ? setTimeout(endGame1vsIA, 2000) : setTimeout(endGame1vs1, 2000);
            return `${currentPlayer.name} gana`;
        }
    }

    //·················································································//

    //································ Verificar Empate ·······························//
    
    if (tablero.flat().every(cell => cell !== 0)) {
        isVsIA ? setTimeout(endGame1vsIA, 2000) : setTimeout(endGame1vs1, 2000);
        return 'Empate';
    }

    //·················································································//
    
    return 'No hay ganador'; //--> No Hay Ganador Ni Empate <--//
}

//-------------------------------------------------------------------------------------//