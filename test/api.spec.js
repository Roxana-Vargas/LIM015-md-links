const api = require('../src/api.js');

/* **** Test function that finds the extension of a file .md **** */
describe('Function that finds the extension of a file .md', () => {
  it('findExtMd() should be a function', () => {
    expect(typeof api.findExtMd).toBe('function');
  });
  it('findExtMd() should return true for a file with extension .md', () => {
    expect(api.findExtMd('README.md')).toBe(true);
  });
  it('findExtMd() should return false for a file with extension .js', () => {
    expect(api.findExtMd('index.js')).toBe(false);
  });
});

/* **** Test function for join two paths **** */
describe('Function for join two pathss', () => {
  it('joinPaths() should be a function', () => {
    expect(typeof api.joinPaths).toBe('function');
  });
  it('joinPaths() should join two paths', () => {
    const result = '\\home\\Laboratoria\\test';
    expect(api.joinPaths('/home/Laboratoria/', './test')).toBe(result);
  });
});

/* **** Test function that identifies the type of route and solves it **** */
describe('function for identify the type of route and solve it', () => {
  it('identifyPath() should be a function', () => {
    expect(typeof api.identifyPath).toBe('function');
  });
  it('identifyPath() should identify the type of route and solve it', () => {
    const pathAbsolute = 'C:\\Users\\user\\Desktop\\LABORATORIA\\src\\cli.js';
    const result = 'C:\\Users\\user\\Desktop\\LABORATORIA\\src\\cli.js';
    expect(api.identifyPath(pathAbsolute)).toBe(result);
  });
  it('identifyPath() should identify the type of route and solve it', () => {
    const pathRelative = '../src/cli.js';
    const result = 'C:\\Users\\user\\Desktop\\LABORATORIA\\src\\cli.js';
    expect(api.identifyPath(pathRelative)).toBe(result);
  });
});

/* **** Test function that verify the exist of a path **** */
describe('Function that verify the exist of a path', () => {
  it('validateExist() should be a function', () => {
    expect(typeof api.validateExist).toBe('function');
  });
  it('validateExist() should return true for an existing path', () => {
    const existingPath = 'C:\\Users\\user\\Desktop\\LABORATORIA\\LIM015-md-links\\src\\cli.js';
    expect(api.validateExist(existingPath)).toBe(true);
  });
  it('validateExist() should return false for a non-existent path', () => {
    const fakePath = 'C:\\Users\\user\\Desktop\\LABORATORIA\\LIM015-md-links\\src\\fake\\cli.js';
    expect(api.validateExist(fakePath)).toBe(false);
  });
});

/* **** Test function that step through a directory **** */
describe('Function to step through a directory', () => {
  it('checkTypeOfPath() should be a function', () => {
    expect(typeof api.checkTypeOfPath).toBe('function');
  });
  it('checkTypeOfPath() should return an array with files .md', () => {
    const pathDir = 'C:\\Users\\user\\Desktop\\LABORATORIA\\LIM015-md-links\\pruebas';
    const result = [
      'C:\\Users\\user\\Desktop\\LABORATORIA\\LIM015-md-links\\pruebas\\file.md',
      'C:\\Users\\user\\Desktop\\LABORATORIA\\LIM015-md-links\\pruebas\\file2.md',
      'C:\\Users\\user\\Desktop\\LABORATORIA\\LIM015-md-links\\pruebas\\pruebas2\\file5.md'
    ];
    expect(api.checkTypeOfPath(pathDir)).toEqual(result);
  });
});

/* **** Test function that gets links from a file **** */
describe('function to get links from a file', () => {
  it('getLinks() should be a function', () => {
    expect(typeof api.getLinks).toBe('function');
  });
  it('getLinks() should return an array of objects with three properties: href, text and file', () => {
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
    expect(api.getLinks(pathFile)).toEqual(result);
  });
});

/* **** Test function that gets status from a link **** */
describe('Function that gets status from a link', () => {
  it('getLinkStatus() should be a function', () => {
    expect(typeof api.getLinkStatus).toBe('function');
  });
  it('getLinkStatus() should return an object with five properties', () => {
    const object = {
      href: 'https://developer.mozilla.org/es/docs/Wb/HTTP/Status',
      text: 'recurso',
      file: '../README.md'
    };
    const result = {
      Href: 'https://developer.mozilla.org/es/docs/Wb/HTTP/Status',
      Txt: 'recurso',
      File: '../README.md',
      Status: 404,
      Ok: 'fail'
    };
    return expect(api.getLinkStatus(object)).resolves.toEqual(result);
  });
  it('getLinkStatus() should return an object with five properties', () => {
    const object = {
      href: 'https://es.wikipedia.org/wiki/Markdown',
      text: 'Markdown',
      file: '../pruebas/file.md'
    };
    const result = {
      Href: 'https://es.wikipedia.org/wiki/Markdown',
      Txt: 'Markdown',
      File: '../pruebas/file.md',
      Status: 200,
      Ok: 'ok'
    };
    return expect(api.getLinkStatus(object)).resolves.toEqual(result);
  });
  it('getLinkStatus() should return an error message for a fake link', () => {
    const object = {
      href: 'www.fakeLink.com',
      text: 'fake',
      file: '../pruebas/file.md'
    };
    const result = {
      Href: 'www.fakeLink.com',
      Txt: 'fake',
      File: '../pruebas/file.md',
      Status: 'Hubo un error con la petición fetch TypeError: Only absolute URLs are supported',
      Ok: 'fail'
    };
    return api.getLinkStatus(object).then(data => {
      expect(data).toEqual(result);
    });
  });
});
