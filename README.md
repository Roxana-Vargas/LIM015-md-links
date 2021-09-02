
# Markdown Links

## Índice

- [1. Preámbulo](#1-preámbulo)
- [2. Resumen del proyecto](#2-resumen-del-proyecto)
- [3. Guía de uso](#3-guía-de-uso)
- [4. Consideraciones generales](#4-consideraciones-generales)

---

## 1. Preámbulo

[Markdown](https://es.wikipedia.org/wiki/Markdown) es un lenguaje de marcado ligero muy popular entre developers. Es usado en muchísimas plataformas que 
manejan texto plano (GitHub, foros, blogs, ...), y es muy común encontrar varios archivos en ese formato en cualquier tipo de repositorio (empezando por 
el tradicional `README.md`).

Estos archivos `Markdown` normalmente contienen _links_ (vínculos/ligas) que muchas veces están rotos o ya no son válidos y eso perjudica mucho el valor 
de la información que se quiere compartir.

Marhdown Links es una herramienta que usa [Node.js](https://nodejs.org/), para leer  y analizar archivos en formato `Markdown`, para verificar los links 
que contengan y reportar algunas estadísticas.


## 2. Resumen del proyecto

Este proyecto, que se ejecuta usando Node.js, comprende una línea de comando (CLI) así como una librería (o biblioteca - library) en JavaScript.
### Diagramas de flujo
#### API
![ ](https://github.com/Roxana-Vargas/LIM015-md-links/blob/main/diagramas/MD-links-API.png)
#### CLI
![ ](https://github.com/Roxana-Vargas/LIM015-md-links/blob/main/diagramas/MD-links-CLI.png)

## 3. Guía de uso

- Instalacion por npm

    `npm i roxanavargas-mdlinks`

- Instalacion por github
    `npm i --global Roxana-Vargas/LIM015-md-links `

Para hacer uso de la API es necesario importar con 
```javascript
const md = require('roxanavargas-mdlinks')
```
## Este proyecto consta de dos partes

### 1) JavaScript API

El módulo se puede *importar* en otros scripts de Node.js y ofrece la siguiente interfaz

#### `mdLinks(path, options)`

##### Argumentos

- `path`: Ruta **absoluta** o **relativa** al **archivo** o **directorio**. 

- `options`: Un objeto con **únicamente** la siguiente propiedad:

  - `validate`: Booleano que determina si se desea validar los links encontrados.

##### Valor de retorno

La función  **retorna una promesa** (`Promise`) que **resuelve a un arreglo** (`Array`) de objetos (`Object`), donde cada objeto representa un link y 
contiene las siguientes propiedades

Con `validate:false` :

- `href`: URL encontrada.
- `text`: Texto que aparecía dentro del link (`<a>`).
- `file`: Ruta del archivo donde se encontró el link.

Con `validate:true` :

- `href`: URL encontrada.
- `text`: Texto que aparecía dentro del link (`<a>`).
- `file`: Ruta del archivo donde se encontró el link.
- `status`: Código de respuesta HTTP.
- `ok`: Mensaje `fail` en caso de fallo u `ok` en caso de éxito.

#### Ejemplo (resultados como comentarios)

```js
const mdLinks = require("md-links");

mdLinks("./some/example.md")
  .then((links) => {
    // => [{ href, text, file }, ...]
  })
  .catch(console.error);

mdLinks("./some/example.md", { validate: true })
  .then((links) => {
    // => [{ href, text, file, status, ok }, ...]
  })
  .catch(console.error);

mdLinks("./some/dir")
  .then((links) => {
    // => [{ href, text, file }, ...]
  })
  .catch(console.error);
```

### 2) CLI (Command Line Interface - Interfaz de Línea de Comando)

El ejecutable de nuestra aplicación se puede ejecutar de la siguiente manera a través de la **terminal**:

`md-links <path-to-file> [options]`

Por ejemplo:
![ ](https://github.com/Roxana-Vargas/LIM015-md-links/blob/main/diagramas/ejemplo1.png)
El comportamiento por defecto no valida si las URLs responden ok o no, solo identifica el archivo markdown (a partir de la ruta que recibe como argumento),
 analiza el archivo Markdown e imprime los links que vaya encontrando, junto con la ruta del archivo donde aparece y el texto que hay dentro del link 
 (truncado a 50 caracteres).

#### Options

##### `--validate`

Si pasamos la opción `--validate`, el módulo hace una petición HTTP para averiguar si el link funciona o no. Si el link resulta en una redirección a una URL 
que responde ok, entonces consideraremos el link como ok.

Por ejemplo:

![ ](https://github.com/Roxana-Vargas/LIM015-md-links/blob/main/diagramas/ejemplo2.png)
Vemos que el _output_ en este caso incluye la palabra `ok` o `fail` después de la URL, así como el status de la respuesta recibida a la petición HTTP a dicha 
URL.

##### `--stats`

Si pasamos la opción `--stats` el output (salida) será un texto con estadísticas básicas sobre los links.

![ ](https://github.com/Roxana-Vargas/LIM015-md-links/blob/main/diagramas/ejemplo3.png)

También podemos combinar `--stats` y `--validate` para obtener estadísticas que necesiten de los resultados de la validación.

![ ](https://github.com/Roxana-Vargas/LIM015-md-links/blob/main/diagramas/ejemplo4.png)

Y por último, si pasamos la opción `--help`, podrás obtener ayuda:
![ ](https://github.com/Roxana-Vargas/LIM015-md-links/blob/main/diagramas/ejemplo5.png)

## 4. Consideraciones generales

- La **librería** y el **script ejecutable** (herramienta de línea de comando - CLI) estan implementados en JavaScript para ser ejecutados con Node.js.

- El módulo **es instalable** via `npm install --global Roxana-Vargas/LIM015-md-linkss`.
- Este módulo incluye tanto un _ejecutable_ que podemos invocar en la línea de comando como una interfaz que podemos importar con `require` para usarlo programáticamente.

- Los **tests unitarios**  cubren el 100% de _statements_, _functions_, _lines_ y _branches_. 
