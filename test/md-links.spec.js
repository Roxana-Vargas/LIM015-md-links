const mdLinks = require('../src/md-links.js');

/* **** Test function md-links **** */
describe('Function md-links', () => {
  it('md-links() if options = { validate: false }, should return an object with three properties', () => {
    const pathFile = 'C:\\Users\\user\\Desktop\\LABORATORIA\\LIM015-md-links\\pruebas\\file.md';
    const result = [
      {
        href: 'https://es.wikipedia.org/wiki/Markdown',
        text: 'Markdown',
        file: 'C:\\Users\\user\\Desktop\\LABORATORIA\\LIM015-md-links\\pruebas\\file.md'
      },
      {
        href: 'https://nodejs.org/',
        text: 'Node.js',
        file: 'C:\\Users\\user\\Desktop\\LABORATORIA\\LIM015-md-links\\pruebas\\file.md'
      }
    ];
    return expect(mdLinks.mdLinks(pathFile, { validate: false })).resolves.toEqual(result);
  });
  it('md-links() if options = { validate: true }, should return an object with five properties', () => {
    const pathFile = 'C:\\Users\\user\\Desktop\\LABORATORIA\\LIM015-md-links\\pruebas\\file.md';
    const result = [
      {
        Href: 'https://es.wikipedia.org/wiki/Markdown',
        Txt: 'Markdown',
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
    return expect(mdLinks.mdLinks(pathFile, { validate: true })).resolves.toEqual(result);
  });
  it('md-links() shuld return error message if path is invalid', () => {
    const fakePath = 'C:\\Users\\user\\Desktop\\LABORATORIA\\LIM015-md-links\\pruebas\\file.js';
    const result = 'la ruta no existe';
    return expect(mdLinks.mdLinks(fakePath)).rejects.toEqual(result);
  });
});
