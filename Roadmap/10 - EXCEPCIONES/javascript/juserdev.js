
/*
 * EJERCICIO:
 * Explora el concepto de manejo de excepciones según tu lenguaje.
 * Fuerza un error en tu código, captura el error, imprime dicho error
 * y evita que el programa se detenga de manera inesperada.
 * Prueba a dividir "10/0" o acceder a un índice no existente
 * de un listado para intentar provocar un error.
 *
 * DIFICULTAD EXTRA (opcional):
 * Crea una función que sea capaz de procesar parámetros, pero que también
 * pueda lanzar 3 tipos diferentes de excepciones (una de ellas tiene que
 * corresponderse con un tipo de excepción creada por nosotros de manera
 * personalizada, y debe ser lanzada de manera manual) en caso de error.
 * - Captura todas las excepciones desde el lugar donde llamas a la función.
 * - Imprime el tipo de error.
 * - Imprime si no se ha producido ningún error.
 * - Imprime que la ejecución ha finalizado. 
 */

function divide(a, b) {
    if (b === 0) {
        throw new Error("El numero no puede ser diviible entre 0")
    }
    return a / b
}

try {
    divide(10, 0)
} catch (error) {
    console.error("Error:", error.message)
} finally {
    console.log("el codigo sigue corriendo mientras capturo el error")
}



console.log("---------------------- Dificultad Extra ----------------------")

class CustomError extends Error {
    constructor(message) {
        super(message)
        this.name = "CustomError"
    }
}

const rules = [
    {
        validate: ({ a }) => typeof a === "string",
        error: () => new TypeError("El parametro a no es un String")
    },
    {
        validate: ({ b }) => typeof b === "number",
        error: () => new TypeError("El parametro b no es un Number")
    },
    {
        validate: ({ c }) => Array.isArray(c),
        error: () => new CustomError("El parametro c no es un Array")
    }
]

function errorFunction({ a, b, c }) {
    for (const rule of rules) {
        if (!rule.validate({ a, b, c })) {
            throw rule.error()
        }
    }
    console.log(`a: ${typeof a} - b: ${typeof b} - c: ${typeof c}`)
}


// function errorFunction(a, b, c) {
//     if (typeof a !== "string") {
//         throw new TypeError("El parametro a no es un String")
//     } else if (typeof b !== "number") {
//         throw new TypeError("El parametro b no es un Number")
//     } else if (!Array.isArray(c)) {
//         throw new CustomError("El parametro c no es un Array")
//     }

//     console.log(`a: ${typeof a} - b: ${typeof b} - c: ${typeof c}`)
// }

try {
    // errorFunction({ a: 2, b: 2, c: [2] })
    // errorFunction({ a: "2", b: "2", c: [2] })
    // errorFunction({ a: "2", b: 2, c: 2 })
    errorFunction({ a: "2", b: 2, c: [2] })
} catch (error) {
    console.error(`${error.name}: ${error.message}`)
} finally {
    console.log("La ejecucion a terminado")
}