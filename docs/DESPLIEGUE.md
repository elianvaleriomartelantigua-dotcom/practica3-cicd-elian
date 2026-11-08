# Guía de despliegue

## GitHub Pages

1. Usa repositorio público con los archivos en la raíz y main como rama.
2. Settings > Pages > Source: GitHub Actions.
3. Haz push o inicia el workflow manualmente desde main.
4. Espera el job Despliegue a GitHub Pages y abre su URL.
5. Comprueba agregar, completar, recargar y eliminar una tarea.

La URL suele tener la forma https://TU_USUARIO.github.io/TU_REPO/; copia la URL real que muestra GitHub. Los recursos usan rutas relativas para funcionar bajo la subcarpeta del repositorio.

## Docker local (opcional)

```bash
docker build -t tareas-devops .
docker run --rm -p 3000:3000 tareas-devops
```

Abre http://localhost:3000. La imagen ejecuta Express, a diferencia de Pages. Los datos del servidor se pierden al detener el contenedor. El healthcheck consulta /health. Docker Desktop no es necesario para trabajar con npm ni para que el runner de GitHub construya la imagen.

## Diagnóstico

- npm ci falla: verifica que package.json y package-lock.json coincidan; al cambiar dependencias usa npm install y confirma ambos archivos.
- Pruebas fallan: abre el paso de Jest y revisa esperado/recibido.
- Cobertura insuficiente: agrega casos que ejerciten la lógica faltante.
- Pages falla: verifica Source, permisos del repositorio y environment github-pages.
- 404 al abrir el sitio: usa la URL completa del job y espera a que termine el deploy.
- Volver a una versión anterior: revierte el commit defectuoso con git revert y haz push; el pipeline volverá a validar y publicar.
