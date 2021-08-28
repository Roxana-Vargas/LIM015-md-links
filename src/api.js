
const fs = require('fs');
const path = require('path');
const fetch = require ('node-fetch');

// Función síncrona que lee un archivo
const readFile = (file) => fs.readFileSync(file, 'utf-8');
// console.log(readFile('../package.json'));

// Función síncrona que lee un directorio
const readDirectory = (dir) => fs.readdirSync(dir);
// console.log(readDirectory('../pruebas'));

// Función síncrona que averigua la extensión de un archivo md
const findExtMd = (file) => (path.extname(file) === '.md' );
// console.log(findExtMd('anything.md'));

// Función que uno dos rutas
const joinPaths = (path1, path2) => path.join(path1, path2);
// console.log(joinPaths('/home/Laboratoria/', './test'));

// Función que indentifica el tipo de ruta y la resuelve
const identifyPath = (route) => path.isAbsolute(route) ? route : path.resolve(route);
// console.log(identifyPath('../pruebas'));

// Función síncrona que verifica la existencia de una ruta
const validateExist = (path) => fs.existsSync(path);
// console.log(validateExist('../package.json'));

// Función recursiva que recorra un directorio y obtenga los paths con extensión md

// Función que verifica si una ruta es file o directorio (síncrono)
const checkTypeOfPath = (path) => {
  statsObj = fs.statSync(path);
  let array = [];
  if ((statsObj.isFile() && findExtMd(path)) === true ) {
    array.push(path);
  } else if (statsObj.isDirectory() === true) {
    const arrayPaths = readDirectory(path);
    arrayPaths.forEach(element => {
      const pathsDir = joinPaths(path,element);
      const newPaths = pathsDir;
      const savePaths = checkTypeOfPath(newPaths);
      array = array.concat(savePaths);
    });
  }
  return array;
};
// console.log(checkTypeOfPath('../pruebas'));

// Función que extrae los links y devuelve un array de objetos
const getLinks = (route) => {
  const fileContent =  readFile(route);
  const linkRegex = /\[([\w\s\d.|()À-ÿ]+)\]\([?:\/|https?:?\/\/]+[\w\d\s./?=#-&_%~,\-.:]+\)/gim;
  const onlyLinkRegex = /\(((?:\/|https?:\/\/)[\w\d\s./?=#&_%~,\-.:]+)\)/gim;
  const textLinkRegex = /\[([\w\s\d.|À-ÿ()]+)\]/gim;
  const links = fileContent.match(linkRegex);
  const linksArray = [];
  links.forEach((link) => {
    const linksObject = {
      href: link.match(onlyLinkRegex).join().replace(/[{()}]/g, ''),
      text: link.match(textLinkRegex).join().replace(/[\[\]']+/g, ''),
      file: route,
    };
    linksArray.push(linksObject);
  });
  return linksArray;
};
// console.log(getLinks('../pruebas/file.md'));

// Función que devuelve el status de un archivo

const object = {
  href: 'https://es.wikipedia.org/wiki/Markdown',
  text: 'Markdown',
  file: '../pruebas/file.md'
};

const getLinkStatus  = ({ href, text, file }) => {
  const resultFetch = fetch(href).then((response) => {
    const status = response.status;
    const linkStatusObject = {
      Href : href,
      Txt: text,
      File: file,
      Status: status,
      Ok: status >= 200 && status <= 399 ? 'ok' : 'fail' ,
    };
    return linkStatusObject;
  }).catch((err) => {
    const linkStatusObjectErr = {
      Href : href,
      Txt: text,
      File: file,
      Status: 'Hubo un error con la petición fetch ' + err,
      Ok:  'fail' ,
    };
    return linkStatusObjectErr;
  });
  return resultFetch;
};

// getLinkStatus(object).then((res) => {
//   console.log(res);
// });

module.exports = {
  readFile,
  readDirectory,
  findExtMd,
  joinPaths,
  identifyPath,
  validateExist,
  checkTypeOfPath,
  getLinks,
  getLinkStatus,
};
