#!/usr/bin/env node

const chalk = require('chalk');
const { mdLinks } = require('./md-links.js');
const {
  stats,
  validate,
  defaultResult
} = require('./stats.js');

const argv = process.argv.slice(2);

if (argv.length === 1) {
  defaultResult(argv[0]);
} else if (argv[1] === '--help' && argv.length === 2) {
  console.log(chalk.white( `
    ╔===============================================================================╗
    |                                  HELP                                         |
    |===============================================================================|
    |                      Utiliza las siguientes opciones                          |
    |--validate: para obtener la ruta del archivo, los links, su status y texto     |
    |--stats: para mostrar el total de links y cantidad de únicos                   |
    |--stats --validate: para mostrar el total de linkk, cantidad de únicos y rotos |
    |                      Si no ingresas ninguna opción:                           |
    |             mostrará la ruta del archivo, el texto y el link                  |
    '-------------------------------------------------------------------------------' 
    `
  ));
} else if ((argv[1] === '--stats' && argv[2] === '--validate')  || (argv[1] === '--validate' && argv[2] === '--stats') && argv.length === 3) {
  mdLinks(argv[0], { validate: true } ).then((res) => {
    stats(res, true);
  });
} else if (argv[1] === '--validate' && argv.length === 2) {
  validate(argv[0]);
} else if (argv[1] === '--stats' && argv.length === 2) {
  mdLinks(argv[0], { validate: true } ).then((res) => {
    stats(res);
  });
} else {
  console.log(chalk.red('x el comando no es válido'));
}
