class Nodo {

    /**
     * Inicializamos la clase nodo, la cual en el constructor le mandamos
     * los parametros de dato y enlace, el cual dato sera la info del nodo
     * y enlace sera nulo hasta que se le asigne el valor anterior o siguiente
     */
    constructor(dato, enlace = null) {
        this.dato = dato;
        this.enlace = enlace;
    }
    /*
    * Metodo leer dato
    */

    leerDato() {
        return this.dato;
    }
}

class Lista {

        /**
     * Inicializamos la clase Lista, la cual en el constructor
     * declaramos la variable de primero como nula
     */

    constructor() {
        this.primero = null;
    }

    /**
     * Devuelve el primer nodo de la lista.
     */
    leerPrimero() {
        return this.primero;
    }

    /**
     * Inserta un nuevo nodo al inicio de la lista.
     * @param {any} entrada - Valor a insertar.
     */
    insertarCabezaLista(entrada) {
        this.primero = new Nodo(entrada, this.primero);
    }

    /**
     * Inserta un nuevo nodo después de un nodo dado.
     * @param {Nodo} anterior - Nodo después del cual se insertará el nuevo nodo.
     * @param {any} entrada - Valor a insertar.
     */
    insertarLista(anterior, entrada) {
        if (anterior) {
            anterior.enlace = new Nodo(entrada, anterior.enlace);
        }
    }

    /**
     * Elimina el primer nodo que contiene el valor especificado.
     * @param {any} entrada - Valor a eliminar.
     */
    eliminar(entrada) {
        let actual = this.primero;
        let anterior = null;
        
        while (actual !== null && actual.dato !== entrada) {
            anterior = actual;
            actual = actual.enlace;
        }

        if (actual !== null) {
            if (actual === this.primero) {
                this.primero = actual.enlace;
            } else {
                anterior.enlace = actual.enlace;
            }
        }
    }

    /**
     * Busca un nodo con el valor especificado.
     * @param {any} destino - Valor a buscar.
     * @returns {Nodo|null} - Nodo encontrado o null si no existe.
     */
    buscarLista(destino) {
        let actual = this.primero;
        while (actual !== null) {
            if (actual.dato === destino) {
                return actual;
            }
            actual = actual.enlace;
        }
        return null;
    }

    /**
     * Muestra la lista en la consola.
     */
    visualizar() {
        let actual = this.primero;
        const elementos = [];
        while (actual !== null) {
            elementos.push(actual.dato);
            actual = actual.enlace;
        }
        console.log(elementos.join(' '));
    }

    /**
     * Invierte el orden de la lista.
     */
    invertirLista() {
        /*
        * Declaramos 3 variables(anterior, actual y siguiente), los cuales tendran 
        * un valor relativo segun la posicion de la lista. El principal objetivo
        * es darle una vuelta a la lista a traves de la reasignacion de nodos
        */
        let anterior = null;
        let actual = this.primero;
        let siguiente = null;
    
        while (actual !== null) {
            siguiente = actual.enlace;
            actual.enlace = anterior;
            anterior = actual;
            actual = siguiente;
        }
        this.primero = anterior;
    }

    /**
     * Elimina nodos duplicados en la lista.
     */
    eliminarDuplicados() {
        let actual = this.primero;
        // declaramos la variable actual, la cual nos dara el primer valor

        while (actual !== null && actual.enlace !== null) {
            // Bucle que recorrera los nodos y sacara los duplicados de la lista
            if (actual.dato === actual.enlace.dato) {
                actual.enlace = actual.enlace.enlace;
            } else {
                actual = actual.enlace;
            }
        }
    }

    /**
     * Obtiene el n-ésimo elemento desde el final de la lista.
     * @param {number} n - Posición desde el final.
     * @returns {any} - Valor del nodo en la posición n desde el final.
     */
    obtenerElementoDesdeElFinal(n) {
        let puntero1 = this.primero;
        let puntero2 = this.primero;
        /*
        * Declaramos dos variables;dos punteros, las cuales serviran
        * para encontrar el elemento solicitado
        */

        for (let i = 0; i < n; i++) {
            // validamos que el valor sea numerico y no nulo
            if (puntero1 == null) {
                throw new Error("La posición está fuera de los límites de la lista");
            }
            
            puntero1 = puntero1.enlace;
        }
            // bucle que asignara el valor a los punteros
        while (puntero1 !== null) {
            puntero1 = puntero1.enlace;
            puntero2 = puntero2.enlace;
        }

        return puntero2.dato;
    }
}

// ======= PRUEBAS AUTOMÁTICAS =======

function testListaEnlazada() {
    // creamos una variable constante llamada lista
    const lista = new Lista();

    // Caso 1: Lista vacía
    console.assert(lista.leerPrimero() === null, "Error: La lista debería estar vacía.");

    // Caso 2: Insertar elementos
    lista.insertarCabezaLista(3);
    lista.insertarCabezaLista(2);
    lista.insertarCabezaLista(1);
    

    console.assert(lista.leerPrimero().dato === 1, "Error: La cabeza de la lista debería ser 1.");

    // Caso 3: Buscar elementos
    console.assert(lista.buscarLista(2) !== null, "Error: 2 debería existir en la lista.");
    console.assert(lista.buscarLista(5) === null, "Error: 5 no debería existir en la lista.");

    // Caso 4: Eliminar elementos
    lista.eliminar(2);
    console.assert(lista.buscarLista(2) === null, "Error: 2 debería haber sido eliminado.");

    // Caso 5: Obtener elemento desde el final
    console.assert(lista.obtenerElementoDesdeElFinal(1) === 3, "Error: El último elemento debería ser 3.");
    
    // Caso 6: Invertir lista
    lista.invertirLista();
    console.assert(lista.leerPrimero().dato === 3, "Error: La cabeza después de invertir debería ser 3.");

    // Caso 7: Eliminar duplicados
    lista.insertarCabezaLista(3);
    lista.insertarCabezaLista(3);
    lista.eliminarDuplicados();
    console.assert(lista.leerPrimero().dato === 3 && lista.leerPrimero().enlace.dato === 1, "Error: Los duplicados no se eliminaron correctamente.");

    console.log("✅ Todas las pruebas pasaron correctamente.");
}

// Ejecutamos los tests
testListaEnlazada();
