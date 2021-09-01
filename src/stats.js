const chalk = require('chalk');
const { mdLinks } = require('./md-links');

// Array de objetos que devuelve md links
// const array = [
//   {
//     Href: 'https://es.wikipedia.org/wiki/Markdown',
//     Txt: 'Markdown',
//     File: 'C:\\Users\\user\\Desktop\\LABORATORIA\\LIM015-md-links\\pruebas\\file.md',
//     Status: 404,
//     Ok: 'fail'
//   },
//   {
//     Href: 'https://nodejs.org/',
//     Txt: 'Node.js',
//     File: 'C:\\Users\\user\\Desktop\\LABORATORIA\\LIM015-md-links\\pruebas\\file.md',
//     Status: 200,
//     Ok: 'ok'
//   },
//   {
//     Href: 'https://nodejs.org/',
//     Txt: 'Node.js',
//     File: 'C:\\Users\\user\\Desktop\\LABORATORIA\\LIM015-md-links\\pruebas\\file.md',
//     Status: 200,
//     Ok: 'ok'
//   }
// ];

// Total de links
const totalLinks = (array) => array.length;
// console.log(totalLinks (array));

// Links únicos
const uniqueLinks = (array) => {
  const uniqueLinks = new Set;
  array.forEach((link) => uniqueLinks.add(link.Href));
  return uniqueLinks.size;
};
// console.log(uniqueLinks(array));

// Links rotos
const brokenLinks = (array) =>  array.filter((link) => link.Ok === 'fail').length;
// console.log(brokenLinks(array));

// Funcion para cuando option sea --stats / stats --validate

const stats = (array, options = false) => {
  const total = totalLinks(array);
  const unique = uniqueLinks(array);
  const broken = brokenLinks(array);
  if (options) {
    return console.log(chalk.bgGreen.black(`Total: ${total} `),chalk.bgYellow.black(`Unique: ${unique} `),chalk.bgRed.black(`Broken: ${broken} `));
  } else {
    return console.log(chalk.bgGreen.black(`Total: ${total} `),chalk.bgYellow.black(`Unique: ${unique} `));
  }
};

const validate = (path) => {
  mdLinks(path, { validate: true } ).then((res) => {
    res.forEach((element) => {
      return console.log(chalk.cyan(element.File), chalk.white(element.Href), (element.Ok === 'ok' ? chalk.green(element.Ok) : chalk.red(element.Ok)),chalk.yellow(element.Status), chalk.magenta(element.Txt));
    });
  });
};
// validate('../pruebas');

const defaultResult = (path) => {
  mdLinks(path).then((res) => {
    if (res.length === 0) {
      return console.log(chalk.red('x El archivo no contiene links'));
    } else {
      res.forEach((element) => {
        return console.log(chalk.cyan(element.file), chalk.white(element.href), chalk.magenta(element.text));
      });
    }
  });
};
// defaultResult('../pruebas/file.md');

module.exports = {
  stats,
  validate,
  defaultResult,
};
