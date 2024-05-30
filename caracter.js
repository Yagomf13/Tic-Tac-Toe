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

            // Añadir un evento change para manejar la selección
            select.addEventListener('change', (event) => {
                const selectedValue = event.target.value;
                onChangeCallback(selectedValue); // Llamar a la función de callback con el valor seleccionado
            });
        }

        // Función de callback para manejar la selección de Player 1
        function handleSelectionPlayer1(value) {
            console.log(`${value}`);
            // Aquí puedes guardar el valor en una variable o manejarlo como prefieras
        }

        // Función de callback para manejar la selección de Player 2
        function handleSelectionPlayer2(value) {
            console.log(`${value}`);
            // Aquí puedes guardar el valor en una variable o manejarlo como prefieras
        }

        // Crear menús desplegables para ambos contenedores con sus respectivas funciones de callback
        emojiSelect(container1, handleSelectionPlayer1);
        emojiSelect(container2, handleSelectionPlayer2);