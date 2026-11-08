# Guía de contribución

1. Clona el repositorio y ejecuta npm ci.
2. Crea una rama: `git switch -c feat/mi-mejora`.
3. Implementa un cambio pequeño y agrega una prueba del comportamiento esperado.
4. Ejecuta `npm run lint` y `npm test`; conserva los umbrales de cobertura.
5. Crea un commit descriptivo y sube tu rama.
6. Abre un pull request a main. Explica problema, cambio y validación.
7. Revisa el resultado de Actions antes de fusionar.

No subas node_modules, coverage, credenciales ni archivos .env. Incluye package-lock.json si cambias dependencias. Mantén las respuestas HTTP y la documentación consistentes. Para reportar un error, indica pasos, resultado esperado y resultado observado.
