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

let tablero = [
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

// Función para verificar el ganador
function verificarGanador(tablero) {
    // Verificar filas y columnas
    for (let i = 0; i < 3; i++) {
        // Verificar filas
        if (tablero[i][0] === tablero[i][1] && tablero[i][1] === tablero[i][2]) {
            if (tablero[i][0] !== 0) {
                return `El jugador ${currentPlayer.nombre} gana`;
            }
        }
        // Verificar columnas
        if (tablero[0][i] === tablero[1][i] && tablero[1][i] === tablero[2][i]) {
            if (tablero[0][i] !== 0) {
                return `El jugador ${currentPlayer.nombre} gana`;
            }
        }
    }

    // Verificar diagonales
    
    // Diagonal principal
    if (tablero[0][0] === tablero[1][1] && tablero[1][1] === tablero[2][2]) {
        if (tablero[0][0] !== 0) {
            return `El jugador ${currentPlayer.nombre} gana`;
        }
    }
    // Diagonal secundaria
    if (tablero[0][2] === tablero[1][1] && tablero[1][1] === tablero[2][0]) {
        if (tablero[0][2] !== 0) {
            return `El jugador ${currentPlayer.nombre} gana`;
        }
    } 

    // Verificar si hay empate (tablero lleno sin ganador)
    if (tablero.flat().every(cell => cell !== 0)) {
        return 'Empate';
    }

    // Si no hay ganador ni empate
    return 'No hay ganador';
}

// Función para jugar un turno
function play(button) {
    const row = button.dataset.row;
    const col = button.dataset.col;

    if (tablero[row][col] === 0) {
        tablero[row][col] = currentPlayer.numero;
        button.textContent = currentPlayer.numero === jugadores[0].numero ? 'X' : 'O';
        
        const resultado = verificarGanador(tablero);
        if (resultado !== 'No hay ganador') {
            turno.innerHTML = resultado;  
            buttons.forEach(button => button.disabled = true); // Desactivar botones
        } else {
            currentPlayer = playerSwitch(currentPlayer);
        }
    } else {
        alert("Espacio ocupado");
    }
    console.log(tablero);
}

// Función para iniciar/reiniciar el juego
startButton.addEventListener("click", () => {
    currentPlayer = randomPlayer();
    turno.innerHTML = `Turno de ${currentPlayer.nombre}`;

    tablero = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
    ];
    buttons.forEach(button => {
        button.textContent = '';
        button.disabled = false;
    });
});

// Asignar event listeners a los botones del tablero
const buttons = document.querySelectorAll('#container button');
buttons.forEach(button => {
    button.addEventListener('click', () => play(button));
});
