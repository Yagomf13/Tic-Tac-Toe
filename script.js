const start1vs1 = document.getElementById("start1vs1");
const start1vsIA = document.getElementById("start1vsIA");
const restartButton = document.getElementById("restartButton");

const turno = document.getElementById("turno");

let jugador1, jugador2; 
function iniciarJuego() {
    jugador1 = prompt("Introduce tu nombre jugador 1");
    jugador2 = prompt("Introduce tu nombre jugador 2");

    // Verificar si los nombres no son nulos o vacíos
    if (jugador1 && jugador2) {
        // Mostrar el tablero y establecer el turno del primer jugador
        headerContainer.style.display = "none";
        container1vs1.style.display = "block";
        jugadores[0].nombre = jugador1;
        jugadores[1].nombre = jugador2;
    } else {
        // Mostrar un mensaje de error si se cancela alguno de los prompts
        alert("Por favor, introduce un nombre para ambos jugadores.");
    }
}

start1vs1.addEventListener("click", iniciarJuego);

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

function verificarGanador(tablero) {
    // Verificar filas y columnas
    for (let i = 0; i < 3; i++) {
        // Verificar filas
        if (tablero[i][0] === tablero[i][1] && tablero[i][1] === tablero[i][2]) {
            if (tablero[i][0] !== 0) {
                marcarGanador([[i, 0], [i, 1], [i, 2]]);
                setTimeout(endGame, 2000);
                return `${currentPlayer.nombre} gana`;
            }
        }
        // Verificar columnas
        if (tablero[0][i] === tablero[1][i] && tablero[1][i] === tablero[2][i]) {
            if (tablero[0][i] !== 0) {
                marcarGanador([[0, i], [1, i], [2, i]]);
                setTimeout(endGame, 2000);
                return `${currentPlayer.nombre} gana`;
            }
        }
    }

    // Verificar diagonales
    if (tablero[0][0] === tablero[1][1] && tablero[1][1] === tablero[2][2]) {
        if (tablero[0][0] !== 0) {
            marcarGanador([[0, 0], [1, 1], [2, 2]]);
            setTimeout(endGame, 2000);
            return `${currentPlayer.nombre} gana`;
        }
    }
    if (tablero[0][2] === tablero[1][1] && tablero[1][1] === tablero[2][0]) {
        if (tablero[0][2] !== 0) {
            marcarGanador([[0, 2], [1, 1], [2, 0]]);
            setTimeout(endGame, 2000);
            return `${currentPlayer.nombre} gana`;
        }
    }

    // Verificar si hay empate (tablero lleno sin ganador)
    if (tablero.flat().every(cell => cell !== 0)) {
        setTimeout(endGame, 2000);
        return 'Empate';
    }

    // Si no hay ganador ni empate
    return 'No hay ganador';
}

function marcarGanador(casillas) {
    casillas.forEach(([row, col]) => {
        const button = document.querySelector(`button[data-row='${row}'][data-col='${col}']`);
        button.style.backgroundColor = "rgb(41, 26, 109)"; 
        button.style.color = "red";
    });
}

function endGame() {
    restartButton.style.display = "block";
    start1vs1.style.display = "none";
    headerContainer.style.display = "block";
    container.style.display = "none";
    title.style.display = "none";
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

function restartGame() {
    // Reiniciar el tablero
    tablero = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
    ];

    // Elegir un jugador aleatoriamente
    currentPlayer = randomPlayer();
    turno.innerHTML = `Turno de ${currentPlayer.nombre}`;

    // Restablecer los botones del tablero
    buttons.forEach(button => {
        button.innerHTML = '&nbsp;'; // Establecer el contenido como un carácter invisible
        button.style.backgroundColor = ""; // Restablecer el color de fondo
        button.disabled = false;
        button.style.color = "white";
    });

    // Mostrar y ocultar los elementos necesarios
    restartButton.style.display = "none";
    headerContainer.style.display = "none";
    container1vs1.style.display = "block"; // Asegurar que el contenedor del tablero sea visible
    container.style.display = "grid"; // Asegurar que el contenedor del tablero use el grid layout
}

restartButton.addEventListener("click", restartGame);

// Iniciar el juego al hacer clic en el botón Start
start1vs1.addEventListener("click", () => {
    currentPlayer = randomPlayer();
    turno.innerHTML = `Turno de ${currentPlayer.nombre}`;
});

// Asignar event listeners a los botones del tablero
const buttons = document.querySelectorAll('#container button');
buttons.forEach(button => {
    button.addEventListener('click', () => play(button));
});
