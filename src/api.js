
const fs = require('fs');
const path = require('path');
const fetch = require ('node-fetch');

// Función síncrona que lee un archivo
const readFile = (file) => fs.readFileSync(file, 'utf-8');

// Función síncrona que lee un directorio
const readDirectory = (dir) => fs.readdirSync(dir);

// Función síncrona que averigua la extensión de un archivo md
const findExtMd = (file) => (path.extname(file) === '.md' );

// Función que uno dos rutas
const joinPaths = (path1, path2) => path.join(path1, path2);

// Función que indentifica el tipo de ruta y la resuelve
const identifyPath = (route) => path.isAbsolute(route) ? route : path.resolve(route);

// Función síncrona que verifica la existencia de una ruta
const validateExist = (path) => fs.existsSync(path);

// Función recursiva que recorra un directorio y obtenga los paths con extensión md

const checkTypeOfPath = (path) => {
  statsObj = fs.statSync(path);
  let array = [];
  if ((statsObj.isFile() && findExtMd(path))) {
    array.push(path);
  } else if (statsObj.isDirectory()) {
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

// Función que extrae los links y devuelve un array de objetos
const getLinks = (route) => {
  const fileContent =  readFile(route);
  const linkRegex = /\[([\w\s\d.|()À-ÿ\-]+)\]\([?:\/|https?:?\/\/]+[\w\d\s./?=#-&_%~,\-.:]+\)/gim;
  const onlyLinkRegex = /\(((?:\/|https?:\/\/)[\w\d\s./?=#&_%~,\-.:]+)\)/gim;
  const textLinkRegex = /\[([\w\s\d.|À-ÿ\-()]+)\]/gim;
  const links = fileContent.match(linkRegex);
  const linksArray = [];
  if (links !== null) {
    links.forEach((link) => {
      const linksObject = {
        href: link.match(onlyLinkRegex).join().replace(/[{()}]/g, ''),
        text: link.match(textLinkRegex).join().replace(/[\[\]']+/g, '').substr(0,49),
        file: route,
      };
      linksArray.push(linksObject);
    });
  }
  return linksArray;
};

// Función que devuelve el status de un archivo

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
