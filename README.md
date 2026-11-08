# Práctica 3: Pipeline CI/CD - ITLA

**Estudiante:** Elian Valerio Marte Lantigua  
**Matrícula:** 20240089  
**Asignatura:** Electiva 1, 2026-C-3  
**Profesor:** Michael Grullón

Proyecto basado en la plantilla oficial. Implementa tareas con Express, pruebas Jest/Supertest, construcción Docker y despliegue estático a GitHub Pages.

## Requisitos y ejecución

- Git, Node.js 22 LTS y npm. Docker es opcional localmente; Actions lo usa en su runner.
- Repositorio público y GitHub Pages con origen **GitHub Actions**.

```bash
npm ci
npm run lint
npm test
npm start
```

Abre http://localhost:3000 . Detén el servidor con Ctrl+C.

## Funciones y API

| Método | Ruta | Resultado |
|---|---|---|
| GET | `/health` | Estado de salud |
| GET | `/metrics` | Solicitudes, errores, tareas y tiempo activo |
| GET | `/api/tareas` | Lista de tareas |
| POST | `/api/tareas` | Crea tarea: `{"titulo":"Estudiar CI/CD"}` |
| PATCH | `/api/tareas/:id` | Alterna su estado |
| DELETE | `/api/tareas/:id` | Elimina; 204 si existe y 404 si no existe |

El título se recorta y admite entre 1 y 120 caracteres. La nueva función DELETE usa identificadores crecientes para evitar duplicados al eliminar tareas. La interfaz permite crear, completar y borrar sin insertar HTML del usuario.

## Qué se agregó a la plantilla

- DELETE y pruebas de eliminación, inexistencia e IDs únicos.
- Validación del título con función pura y pruebas unitarias de los límites.
- Pruebas de integración adicionales con Supertest.
- `package-lock.json` y `npm ci` para instalación reproducible.
- Cobertura con umbral mínimo: 85% en líneas, sentencias y funciones; 80% en ramas.
- Frontend funcional en Pages con localStorage.
- Documentación de contribución, despliegue, demo e informe.

## Etapas del pipeline

Se activa con push a main, pull request dirigido a main o ejecución manual.

1. **Checkout y Node:** obtiene el código e instala Node 22.
2. **Dependencias:** `npm ci` instala las versiones del lockfile.
3. **Revisión:** `npm run lint` comprueba sintaxis JavaScript; es una revisión básica, no ESLint.
4. **Pruebas:** Jest ejecuta pruebas unitarias e integración y exige los umbrales de cobertura.
5. **Evidencia:** sube el directorio de cobertura como artefacto.
6. **Build:** Docker construye la imagen con dependencias de producción.
7. **Despliegue:** solo si el job anterior tiene éxito y la ejecución viene de main fuera de una PR, se publica public/ en Pages.

Si falla una prueba, Docker y el despliegue no continúan. El despliegue tiene permisos pages:write e id-token:write; el resto solo lectura del repositorio.

## Diferencia entre servidor y Pages

Con npm start, Express atiende la API y guarda tareas en memoria: reiniciarlo borra esas tareas. GitHub Pages publica archivos estáticos, no ejecuta Node.js. En Pages, el navegador usa localStorage; sus datos no se comparten con otros navegadores. El pipeline construye la imagen Docker para validar el build, pero no publica ni aloja esa imagen. La detección inicial también permite modo local cuando no hay API.

## Estructura

```text
.github/workflows/ci.yml   Automatización CI/CD
src/                      API y validador
public/                   Frontend desplegable
 tests/                   Jest y Supertest
 docs/                    Guías, informe y demostración
Dockerfile                Imagen de producción
CONTRIBUTING.md           Guía de contribución
```

## Instalación y entrega en GitHub

Sigue [la guía paso a paso](docs/PASO_A_PASO.md). Usa un repositorio nuevo y público para no sobrescribir tu laboratorio anterior. El paquete no ha sido publicado ni ejecutado en GitHub desde este entorno: falta crear el repositorio, activar Pages y recoger las evidencias reales.

- [Pipeline](docs/PIPELINE.md)
- [Despliegue](docs/DESPLIEGUE.md)
- [Informe](docs/INFORME_IMPLEMENTACION.md)
- [Guion para video](docs/GUION_VIDEO.md)
- [Contribuir](CONTRIBUTING.md)

## Fuentes

- Plantilla oficial adjunta, sección Práctica 3.
- https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages
- https://docs.npmjs.com/cli/commands/npm-ci/
