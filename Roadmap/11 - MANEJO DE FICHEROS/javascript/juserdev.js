/*
 * IMPORTANTE: Sólo debes subir el fichero de código como parte del ejercicio.
 * 
 * EJERCICIO:
 * Desarrolla un programa capaz de crear un archivo que se llame como
 * tu usuario de GitHub y tenga la extensión .txt.
 * Añade varias líneas en ese fichero:
 * - Tu nombre.
 * - Edad.
 * - Lenguaje de programación favorito.
 * Imprime el contenido.
 * Borra el fichero.
 *
 * DIFICULTAD EXTRA (opcional):
 * Desarrolla un programa de gestión de ventas que almacena sus datos en un 
 * archivo .txt.
 * - Cada producto se guarda en una línea del archivo de la siguiente manera:
 *   [nombre_producto], [cantidad_vendida], [precio].
 * - Siguiendo ese formato, y mediante terminal, debe permitir añadir, consultar,
 *   actualizar, eliminar productos y salir.
 * - También debe poseer opciones para calcular la venta total y por producto.
 * - La opción salir borra el .txt.
 */

// uso de NODE.JS para trabajar con ficheros
const fs = require("fs")

// // Nombre del archivo
// const fileName = "juserdev.text"

// // Contenido del archiv
// const content = `Juan
// 34
// javascript`

// // creacion del archivo 
// fs.writeFileSync(fileName, content)
// // fs.writeFileSync ademas de crear el archivo si el archivo existe lo sobreescribe
// console.log("Archivo creado correctamente")

// // leer el archivo
// const fileContent = fs.readFileSync(fileName, "utf-8")

// // Imprimimos el contenido
// console.log("Contenido del archivo:")
// console.log(fileContent)

// // Borrar el archivo
// fs.unlinkSync(fileName)

// console.log("Archivo eliminado correctamente")

// ---------------- Dificultad Extra ------------------------

const readline = require("readline")

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

// Practica

// rl.question("¿Como te llamas? ", (answer) => {
//     console.log("Hola ", answer)
//     rl.close()
// })

function showMenu() {
    console.log("\n--- MENÚ DE VENTAS ---")
    console.log("1. Añadir producto")
    console.log("2. Consultar productos")
    console.log("3. Salir")

    rl.question("Elige una opción: ", (option) => {
        handleOption(option)
    })
}


const salesFile = "ventas.txt"

if (!fs.existsSync(salesFile)) {
    fs.writeFileSync(salesFile, "")
}

function readProducts() {
    const data = fs.readFileSync(salesFile, "utf-8")

    if (!data.trim()) {
        return []
    }

    return data.split("\n").map(line => {
        const [name, quantity, price] = line.split(",")
        return {
            name: name.trim(),
            quantity: Number(quantity),
            price: Number(price)
        }
    })
}

function saveProducts(products) {
    const content = products
        .map(p => `${p.name}, ${p.quantity}, ${p.price}`)
        .join("\n")

    fs.writeFileSync(salesFile, content)
}

function handleOption(option) {
    switch (option) {
        case "1":
            rl.question("Nombre del producto: ", (name) => {
                rl.question("Cantidad vendida: ", (quantity) => {
                    rl.question("Precio: ", (price) => {

                        const products = readProducts()

                        products.push({
                            name: name.trim(),
                            quantity: Number(quantity),
                            price: Number(price)
                        })

                        saveProducts(products)

                        console.log("Producto añadido correctamente.")
                        showMenu()
                    })
                })
            })
            break;
        case "2":
            const products = readProducts()

            if (products.length === 0) {
                console.log("No hay productos registrados.")
            } else {
                console.log("\nProductos:")
                products.forEach(p => {
                    console.log(`- ${p.name}: ${p.quantity} x $${p.price}`)
                })
            }
            showMenu()
            break;
        case "3":
            console.log("Saliendo...")
            showMenu()
            break;

        default:
            console.log("Opción no válida")
            showMenu()
            break;
    }
}

showMenu()

