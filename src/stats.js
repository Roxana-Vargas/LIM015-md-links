const chalk = require('chalk');

// Array de objetos que devuelve md links
const array = [
  {
    Href: 'https://es.wikipedia.org/wiki/Markdown',
    Txt: 'Markdown',
    File: 'C:\\Users\\user\\Desktop\\LABORATORIA\\LIM015-md-links\\pruebas\\file.md',
    Status: 404,
    Ok: 'fail'
  },
  {
    Href: 'https://nodejs.org/',
    Txt: 'Node.js',
    File: 'C:\\Users\\user\\Desktop\\LABORATORIA\\LIM015-md-links\\pruebas\\file.md',
    Status: 200,
    Ok: 'ok'
  },
  {
    Href: 'https://nodejs.org/',
    Txt: 'Node.js',
    File: 'C:\\Users\\user\\Desktop\\LABORATORIA\\LIM015-md-links\\pruebas\\file.md',
    Status: 200,
    Ok: 'ok'
  }
];

// Total de links
const totalLinks = (array) => array.length;
console.log(totalLinks (array));

// Links únicos
const uniqueLinks = (array) => {
  const uniqueLinks = new Set;
  array.forEach((link) => uniqueLinks.add(link.Href));
  return uniqueLinks.size;
};
console.log(uniqueLinks(array));

// Links rotos
const brokenLinks = (array) =>  array.filter((link) => link.Ok === 'fail').length;
console.log(brokenLinks(array));

// Funcion para cuando option sea --stats / stats --validate

// const stats = (array) => {
//   const stats = {};
//   stats.Total = totalLinks(array);
//   stats.Unique = uniqueLinks(array);
//   return console.log(stats);
// };

// stats(array);
// // Funcion para --stats --validate
// const statsValidate = (array) => {
//   const stats = {};
//   stats.Total = totalLinks(array);
//   stats.Unique = uniqueLinks(array);
//   stats.Broken = brokenLinks(array);
//   return console.log(stats);
// };
// statsValidate(array);

const stats = (array, options = { validate: false }) => {
  const total = totalLinks(array);
  const unique = uniqueLinks(array);
  const broken = brokenLinks(array);
  if (options.validate) {
    return console.log(chalk.bgGreen.black(`Total: ${total} `),chalk.bgYellow.black(`Unique: ${unique} `),chalk.bgRed.black(`Broken: ${broken} `));
  } else {
    return console.log(chalk.bgGreen.black(`Total: ${total} `),chalk.bgYellow.black(`Unique: ${unique} `));
  }
};

stats(array);
