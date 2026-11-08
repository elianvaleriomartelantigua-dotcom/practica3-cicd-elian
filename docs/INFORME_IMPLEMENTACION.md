# Informe de implementación: pipeline CI/CD

**Nombre:** Elian Valerio Marte Lantigua  
**Matrícula:** 20240089  
**Asignatura:** Electiva 1, 2026-C-3  
**Profesor:** Michael Grullón  
**Fecha:** 8 de noviembre de 2026

## Objetivo y alcance

Automatizar la revisión, las pruebas, la construcción y el despliegue de una aplicación web basada en la plantilla oficial del ITLA. El proyecto incluye backend Express e interfaz de tareas, con una publicación estática en GitHub Pages.

## Implementación

Se añadió DELETE /api/tareas/:id con respuesta 204 al eliminar y 404 si no existe. Se corrigió la generación de IDs para evitar duplicados después de borrar. Se incorporó una validación reutilizable que exige títulos no vacíos y un máximo de 120 caracteres después de recortar espacios.

La interfaz permite agregar, completar y eliminar. En el servidor utiliza la API; en Pages usa localStorage, porque ese servicio publica archivos estáticos y no ejecuta Express. Esta distinción evita depender de una API inexistente en la página desplegada.

## Pruebas y calidad

Las pruebas originales se conservaron. Se añadieron pruebas unitarias de títulos e integración para DELETE, IDs, longitudes, alternancia de estado y frontend. Jest genera cobertura y exige 85% en sentencias, líneas y funciones y 80% en ramas. La revisión de sintaxis usa node --check.

Consulta VALIDACION_LOCAL.md para los resultados realmente obtenidos al preparar este paquete. El build Docker y la ejecución en GitHub se deben verificar en el repositorio de entrega.

## Automatización

El workflow instala dependencias con npm ci, valida sintaxis, ejecuta pruebas, guarda cobertura y construye Docker. El segundo job solo publica public/ cuando el primero termina correctamente y la ejecución corresponde a main fuera de una PR. No se despliega Express en Pages ni se publica la imagen Docker en un registro.

## Demostración de fallo y recuperación (completar tras ejecutar)

La guía indica modificar temporalmente la expectativa de GET /health, subir el commit, capturar Actions rojo, restaurar la expectativa correcta y capturar Actions verde. Estas ejecuciones remotas todavía no forman parte de la evidencia del paquete.

- Repositorio real: **PENDIENTE**
- URL Pages verificada: **PENDIENTE**
- URL de ejecución roja y commit: **PENDIENTE**
- URL de ejecución verde y commit: **PENDIENTE**
- Capturas anexas: **PENDIENTE**
- Video YouTube: **PENDIENTE**

## Conclusiones

La propuesta conecta validaciones automáticas con una publicación condicionada a su éxito. Las pruebas del comportamiento nuevo ayudan a detectar regresiones y el lockfile permite repetir la instalación. Como límites, la API conserva datos en memoria, Pages guarda datos por navegador y no se incorpora alojamiento de backend ni persistencia de servidor.

## Referencias

- Plantilla oficial DevOps ITLA, README, sección Práctica 3.
- https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages
- https://docs.npmjs.com/cli/commands/npm-ci/
