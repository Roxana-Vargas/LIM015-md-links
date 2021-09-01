const {
  identifyPath,
  validateExist,
  checkTypeOfPath,
  getLinks,
  getLinkStatus
} = require('./api.js');

const mdLinks = (path, options = { validate: false }) => new Promise ((resolve, reject) => {
  let err = '';
  if (validateExist(path)) {
    const pathResolved = identifyPath(path);
    const pathsArray = checkTypeOfPath(pathResolved);
    let arrayLinks = [];
    pathsArray.forEach((file) => {
      arrayLinks =  arrayLinks.concat(getLinks(file));
    });
    if (options.validate) {
      Promise.all(arrayLinks.map((el) =>
        getLinkStatus(el))).then((res) =>
        resolve(res));
    } else  {
      resolve(arrayLinks);
    }
  } else {
    err = 'la ruta no existe';
    reject(err);
  }
});

// mdLinks('../pruebas/pruebas2/file5.md', { validate: true }).then((res) => {
//   console.log(res);
// });

module.exports = { mdLinks };
