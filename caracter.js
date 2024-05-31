const container1 = document.getElementById('caracterPlayer1Emoji');
const container2 = document.getElementById('caracterPlayer2Emoji');

// Función para crear el menú desplegable de emoticonos
function emojiSelect(container, onChangeCallback) {
    const emoticons = [ '👌', '👉👌','X', 'O', '🌯', '💩', '🐶', '🐱', '🤰', '🍁', '😡', '🤖', '👽', '👾', '😇', '🤡', '👻'];

    // Crear el elemento <select>
    const select = document.createElement('select');
    select.classList.add('containeremoticono'); // Añadir la clase

    // Agregar las opciones al <select>
    emoticons.forEach(element => {
        const option = document.createElement('option');
        option.value = element;
        option.textContent = element;
        select.appendChild(option);
    });

    // Agregar el <select> al contenedor
    container.appendChild(select);

}

// Crear menús desplegables para ambos contenedores con sus respectivas funciones de callback
emojiSelect(container1);
emojiSelect(container2);