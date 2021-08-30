jest.mock('node-fetch');
const fetch = require('node-fetch');

const { getLinkStatus } = require('../src/api');

/* **** Test function that gets status from a link **** */
describe('Function that gets status from a link', () => {
  it('getLinkStatus() should be a function', () => {
    expect(typeof getLinkStatus).toBe('function');
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
    fetch.mockImplementation(() => Promise.resolve({
      status: 404,
    }));
    return expect(getLinkStatus(object)).resolves.toEqual(result);
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
      Ok: 'ok',
    };
    fetch.mockImplementation(() => Promise.resolve({
      status: 200,
    }));
    return expect(getLinkStatus(object)).resolves.toEqual(result);
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
    fetch.mockImplementation(() => Promise.reject({ }));
    return getLinkStatus(object).catch(data => {
      expect(data).toEqual(result);
    });
  });
});
