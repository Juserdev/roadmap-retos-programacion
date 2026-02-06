/*
 * IMPORTANTE: Sólo debes subir el fichero de código como parte del ejercicio.
 * 
 * EJERCICIO:
 * Desarrolla un programa capaz de crear un archivo XML y JSON que guarde los
 * siguientes datos (haciendo uso de la sintaxis correcta en cada caso):
 * - Nombre
 * - Edad
 * - Fecha de nacimiento
 * - Listado de lenguajes de programación
 * Muestra el contenido de los archivos.
 * Borra los archivos.
 *
 * DIFICULTAD EXTRA (opcional):
 * Utilizando la lógica de creación de los archivos anteriores, crea un
 * programa capaz de leer y transformar en una misma clase custom de tu 
 * lenguaje los datos almacenados en el XML y el JSON.
 * Borra los archivos.
 */

const fs = require("fs")

const person = {
    name: "Juan",
    age: 34,
    birthDate: "1991-03-09",
    languages: ["Javascript", "React"]
}

function createJSONFile(file, object) {

    const json = JSON.stringify(object, null, 2)
    fs.writeFileSync(file, json)
    const fileContent = fs.readFileSync(file, "utf-8")

    console.log("Contenido del archivo JSON:")
    console.log(fileContent)

    fs.unlinkSync(file)

    console.log("Archivo JSON eliminado correctamente")

}

createJSONFile("juserdev.json", person)

console.log("\n")
console.log("--------------- DIFICULTAD EXTRA ---------------")
console.log("\n")


function transformJSONToClass(file, object) {
    const json = JSON.stringify(object, null, 2)
    fs.writeFileSync(file, json)
    const fileContent = fs.readFileSync(file, "utf-8")
    const objectToJSON = JSON.parse(fileContent)

    class Person {
        constructor(name, age, birthDate, languages) {
            this.name = name
            this.age = age
            this.birthDate = birthDate
            this.languages = languages
        }

        static fromJSON(jsonObject) {
            return new Person(
                jsonObject.name,
                jsonObject.age,
                jsonObject.birthDate,
                jsonObject.languages
            )
        }
    }

    const newPerson = Person.fromJSON(objectToJSON)
    fs.unlinkSync(file)
    return newPerson

}

const juan = transformJSONToClass("juserdev2.json", person)
console.log(juan)