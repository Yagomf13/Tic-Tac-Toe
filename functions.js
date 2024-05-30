//·····················································································//
//|                                    FUNCIONES                                      |//
//·····················································································//

//#####################################################################################//

//---------------------- Escoger Aleatóriamente el Primer Jugador ---------------------//

function randomPlayer() {
    return players[Math.floor(Math.random() * 2)];
}

//-------------------------------------------------------------------------------------//

//#####################################################################################//

//------------------------ Inicializar Con el Primer Jugador  -------------------------//

function firstPlayer() {
    currentPlayer = randomPlayer();
    turno.innerHTML = `Turno de ${currentPlayer.name}`;
    if (isVsIA && currentPlayer.name === "IA") {
        setTimeout(() => playIA(), 500); // IA haz el primer movimiento
    }
}

//-------------------------------------------------------------------------------------//

//#####################################################################################//

//---------------------- Escoger Aleatóriamente el Primer Jugador ---------------------//

function randomPlayer() {
    return players[Math.floor(Math.random() * 2)];
}

//-------------------------------------------------------------------------------------//

//#####################################################################################//

//------------------------------ Hacer el Cambio Del Menú  ----------------------------//

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

//-------------------------------------------------------------------------------------//

//#####################################################################################//

//--------------------------- Cambiar el Color del Ganador  ---------------------------//

function markWinner(cells) {
    cells.forEach(([row, col]) => {
        const button = document.querySelector(`button[data-row='${row}'][data-col='${col}']`);
        button.style.backgroundColor = "rgb(41, 26, 109)"; 
        button.style.color = "red";
    });
}

//-------------------------------------------------------------------------------------//

//#####################################################################################//


