//·····················································································//
//|                                    FUNCIONES                                      |//
//·····················································································//

//#####################################################################################//

//---------------------- Escoger Aleatóriamente el Primer Jugador ---------------------//

function randomPlayer() {                                                                //! Función duplicada
    return players[Math.floor(Math.random() * 2)];
}

//-------------------------------------------------------------------------------------//

//#####################################################################################//

//------------------------ Inicializar Con el Primer Jugador  -------------------------//

function firstPlayer() {
    currentPlayer = randomPlayer();
    turno.innerHTML = `Turno de ${currentPlayer.name}`;
    if (isVsIA && currentPlayer.name === "IA") {
        setTimeout(() => playIA(), 500); //-----------> IA haz el primer movimiento <--//
    }
}

//-------------------------------------------------------------------------------------//

//#####################################################################################//

//---------------------- Escoger Aleatóriamente el Primer Jugador ---------------------//

function randomPlayer() {                                                                //! Función duplicada
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
    emoji.style.display = "none";
}

function endGame1vsIA() {
    headerContainer.style.display = "block";
    restartButton1vsIA.style.display = "block";
    restartButton1vs1.style.display = "none";
    start1vsIA.style.display = "none";
    start1vs1.style.display = "block";
    container.style.display = "none";
    title.style.display = "none";
    emoji.style.display = "none";
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

//------------------------ Cambiar el Turno Entre los Jugadores -----------------------//

function playerSwitch(currentPlayer) {
    currentPlayer = currentPlayer.number === players[0].number ? players[1] : players[0];             //?que ishto aa
    turno.innerHTML = `Turno de ${currentPlayer.name}`;
    
    if (isVsIA && currentPlayer.name === "IA") {
        setTimeout(() => playIA(), 500);//--> Retraso simula el pensamiento de la IA <-//
    }

    return currentPlayer;
}

//-------------------------------------------------------------------------------------//

//#####################################################################################//

//---------------------------------- Reiciar el Juego ---------------------------------//

function restartGame() {
    //···························· Reiniciar el Tablero ·······························//
    tablero = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
    ];
    //·················································································//

    //····················· Restablecer los Botones del Tablero ·······················//
    buttons.forEach(button => {
        button.innerHTML = '&nbsp;';    
        button.style.backgroundColor = ""; 
        button.disabled = false;
        button.style.color = "white";
    });
    //·················································································//

    //·························· Mostrar / Ocultar Elementos  ·························//
    restartButton1vs1.style.display = "none";
    headerContainer.style.display = "none";
    container1vs1.style.display = "block";
    container.style.display = "grid";
    emoji.style.display = "none";
    //·················································································//

    firstPlayer();
}

//-------------------------------------------------------------------------------------//

//#####################################################################################//