const startButton = document.getElementById("start");
const turno = document.getElementById("turno");

const jugador1 = prompt("Introduce tu nombre jugador 1");
const jugador2 = prompt("Introduce tu nombre jugador 2");

const jugadores = [
    {
        nombre: jugador1,
        numero: 1
    },
    {
        nombre: jugador2,
        numero: 4
    }
];

const tablero = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
];

let currentPlayer;

// Función para elegir al jugador inicial
function randomPlayer() {
    return jugadores[Math.floor(Math.random() * 2)];
}

// Función para cambiar de jugador
function playerSwitch(actualPlayer) {
    actualPlayer = actualPlayer.numero === jugadores[0].numero ? jugadores[1] : jugadores[0];
    turno.innerHTML = `Turno de ${actualPlayer.nombre}`;
    return actualPlayer;
}

// Función para jugar un turno
function play(button) {
    const row = button.dataset.row;
    const col = button.dataset.col;

    if (tablero[row][col] === 0) {
        tablero[row][col] = currentPlayer.numero;
        button.textContent = currentPlayer.numero === jugadores[0].numero ? 'X' : 'O';
        currentPlayer = playerSwitch(currentPlayer);
    } else {
        alert("Espacio ocupado");
    }
    console.log(tablero);
}

// Iniciar el juego al hacer clic en el botón Start
startButton.addEventListener("click", () => {
    currentPlayer = randomPlayer();
    turno.innerHTML = `Turno de ${currentPlayer.nombre}`;
    startButton.disabled = true;
});

// Asignar event listeners a los botones del tablero
const buttons = document.querySelectorAll('#container button');
buttons.forEach(button => {
    button.addEventListener('click', () => play(button));
});