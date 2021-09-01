const chalk = require('chalk');
const { mdLinks } = require('./md-links.js');
const {
  stats,
  validate,
  defaultResult
} = require('./stats.js');

// console.log(process.argv.slice(2));

const argv = process.argv.slice(2);

if (argv.length === 1) {
  defaultResult(argv[0]);
}
else if ((argv[1] === '--stats' && argv[2] === '--validate')  || (argv[1] === '--validate' && argv[2] === '--stats') && argv.length === 3) {
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
