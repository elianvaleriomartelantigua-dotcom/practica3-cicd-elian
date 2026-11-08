# Validación local del paquete

Fecha: 8 de noviembre de 2026.

- Entorno: Node 24.22.1 y npm 11.9.0. El workflow y Docker utilizan Node 22; esa versión se verificará en GitHub.
- npm install: completado; se generó package-lock.json.
- npm run lint: correcto en los cuatro archivos JavaScript de producción.
- npm test: **20 pruebas correctas**, dos suites.
- Cobertura: **96.29% sentencias, 90% ramas, 100% funciones, 100% líneas** para src/app.js y src/validarTitulo.js. La UI no está incluida en esta medición.
- Demostración local: al cambiar la expectativa de /health a fallo-intencional, Jest terminó con código de error. Se restauró la expectativa original y las 20 pruebas pasaron nuevamente.
- Docker no está instalado en este entorno: build pendiente de ejecutar en GitHub Actions o en un equipo con Docker.
- No se creó repositorio ni se ejecutó Actions o Pages desde este entorno. Las capturas de ejecuciones roja/verde, la URL de Pages y el video quedan pendientes en la cuenta del estudiante.

## Resultado de la última ejecución correcta

```text

> practica3-cicd-elian@1.0.0 test
> jest --coverage --runInBand

------------------|---------|----------|---------|---------|-------------------
File              | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
------------------|---------|----------|---------|---------|-------------------
All files         |   96.29 |       90 |     100 |     100 |                   
 app.js           |   95.83 |    85.71 |     100 |     100 | 20-21             
 validarTitulo.js |     100 |      100 |     100 |     100 |                   
------------------|---------|----------|---------|---------|-------------------
npm warn Unknown env config "http-proxy". This will stop working in the next major version of npm.
PASS tests/app.test.js
PASS tests/nuevas.test.js

Test Suites: 2 passed, 2 total
Tests:       20 passed, 20 total
Snapshots:   0 total
Time:        0.511 s, estimated 1 s
Ran all test suites.

```
