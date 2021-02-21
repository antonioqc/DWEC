/**
 * @author Antonio Quesada Cuadrado
 */

const buscaminas = (function () {
    let tablero = [];
    let banderas;
    let casillasRestantes;

    /**
     * Almacenamos los niveles. Por cada nivel definimos el número de filas, columnas y minas.
     */
    const NIVELES = [
        //facil 
        { filas: 8, columnas: 8, minas: 10 },
        //medio
        { filas: 14, columnas: 18, minas: 40 },
        //dificil
        { filas: 20, columnas: 24, minas: 99 },
    ];

    /**
     * Mostramos tablero básico inicialmente inicialmente.
     */
    function init(nivel = NIVELES[0]) {
        generarCampoMinas(nivel);
        setMinas(nivel);
        mostrar();
        banderas = NIVELES[0].minas;
        casillasRestantes = ((NIVELES[0].filas * NIVELES[0].columnas) - NIVELES[0].minas);
    }
    init();

    /**
     * Función mostrar tablero.
     */
    function mostrar() {
        console.table(tablero);
    }

    /**
     * Genera un campo de minas 
     * @param {number} filas 
     * @param {number} columnas
     */
    function generarCampoMinas({ filas = NIVELES[0].filas, columnas = NIVELES[0].columnas }) {
        for (let i = 0; i < filas; i++) {
            tablero[i] = [];
            for (let j = 0; j < columnas; j++) {
                tablero[i][j] = 0;
            }
        }
    }

    /**
     * Pone en el tablero las minas.
     * Considero el número NIVELES[0].minas como una mina.
     * @param {number} filas 
     * @param {number} columnas 
     * @param {number} numMinas
     */
    function setMinas({ filas = NIVELES[0].filas, columnas = NIVELES[0].columnas, numMinas = NIVELES[0].minas }) {
        let i;
        let j;
        for (let n = 0; n < numMinas; n++) {
            do {
                i = parseInt(Math.random() * (filas));
                j = parseInt(Math.random() * (columnas));
                if (tablero[i][j] != NIVELES[0].minas) {
                    numMinas--;
                    tablero[i][j] = NIVELES[0].minas;
                }
                for (let k = Math.max(0, i - 1); k <= Math.min(i + 1, filas - 1); k++) {
                    for (let d = Math.max(0, j - 1); d <= Math.min(j + 1, columnas - 1); d++) {
                        if (tablero[k][d] != NIVELES[0].minas) {
                            tablero[k][d]++;
                        }
                    }
                }

            } while (numMinas != 0);

        }
    }

    /**
     * Intenta destapar las casillas colindantes, sólo si el número de banderas se corresponden con las que indica la casilla. Entonces muestra el campo de minas actualizado. 
     * @param {number} filas 
     * @param {number} columnas 
     */
    function despejar(fila, columna) {
        for (let j = Math.max(0, fila - 1); j <= Math.min(fila + 1, NIVELES[0].filas - 1); j++) {
            for (let k = Math.max(0, columna - 1); k <= Math.min(columna + 1, NIVELES[0].columnas - 1); k++) {
                tablero[fila][columna] = "-";
                picar(j, k);
            }
        }
    }

    /**
     * Buscaminas .picar(x, y): pica en la casilla (x, y) y muestra el campo de minas actualizado.
     * En caso de picar una minas se indica que se ha perdido el juego. 
     * En caso de no quedar casillas por levantar se indica que se ha ganado el juego. Da igual si las minas están marcadas o no.
     * @param {number} fila 
     * @param {number} columna
     * @returns false si ha picado en una mina 
     * @returns true si ha ganado y no queda ninguna casilla por destapar
     */
    function picar(fila, columna) {
        let valor = tablero[fila][columna];

        //Pierde
        if (valor == NIVELES[0].minas) {
            return false;
        }

        //Despeja casillas cuando no es 0 y existen cerca bombas
        if (valor >= 0 || valor < NIVELES[0].minas) {
            tablero[fila][columna] = "-";
            casillasRestantes--; //conforme va destapando casillas, las casillas restantes van disminuyendo
        }

        //Despeja casillas cuando es 0
        if (valor == 0) {
            despejar(fila, columna);
        }

        //Cuando casillas restantes llegue a 0; es decir no hay mas por destapar, el usuario ha ganado.
        if (casillasRestantes == 0) {
            return true;
        }
    }

    /**
     * Marca con una bandera la casilla (x, y) y muestra el campo de minas actualizado.
     * @param {number} fila 
     * @param {number} columna 
     */
    function marcar(fila, columna) {
        let valor = tablero[fila][columna];

        if (valor >= 0 || valor <= NIVELES[0].minas) {
            banderas--;
            tablero[fila][columna] = "B";
        }

        if (banderas <= 0) {
            return false;
        }
    }

    return {
        init: init,
        mostrar: mostrar,
        NIVELES: NIVELES,
        picar: picar,
        despejar: despejar,
        marcar: marcar,
    }
})();


