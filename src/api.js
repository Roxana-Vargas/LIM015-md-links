// module.exports = () => {
//   // ...
// };

const fs = require('fs');
const path = require('path');
const fetch = require ('node-fetch');

// Función síncrona que lee un archivo
const readFile = (file) => fs.readFileSync(file, 'utf-8');
// console.log(readFile('../package.json'));

// Función síncrona que lee un directorio
const readDirectory = (dir) => fs.readdirSync(dir);
// console.log(readDirectory('../diagramas'));

// Función síncrona que averigua la extensión de un archivo md
const findExtMd = (file) => (path.extname(file) === '.md' );
// console.log(findExtMd('anything.md'));

// Función que uno dos rutas
const joinPaths = (path1, path2) => path.join(path1, path2);
// console.log(joinPaths('/home/Laboratoria/', './test'));

// Función que indentifica el tipo de ruta y la resuelve
const identifyPath = (route) => path.isAbsolute(route) ? route : path.resolve(route);
// console.log(identifyPath('cli.js'));

// Función síncrona que verifica la existencia de una ruta
const validateExist = (path) => fs.existsSync(path);
// console.log(validateExist('../package.json'));
