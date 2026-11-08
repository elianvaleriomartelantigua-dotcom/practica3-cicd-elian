# Paso a paso para entregar

## 1. Preparar

Extrae TODO el ZIP. Abre la carpeta que contiene package.json en VS Code. En Terminal > Nueva terminal ejecuta, una línea a la vez:

```powershell
node --version
npm --version
npm ci
npm run lint
npm test
npm start
```

Si PowerShell bloquea npm.ps1, usa `npm.cmd` en lugar de npm o cambia la terminal a Símbolo del sistema. Abre http://localhost:3000 y prueba crear, completar y eliminar. Ctrl+C detiene el servidor.

## 2. Crear repositorio público

En https://github.com/new crea `practica3-cicd-elian`, público, SIN README ni .gitignore. Este nombre es una propuesta: usa el nombre real en todos los comandos. En la terminal de tu proyecto:

```powershell
git init
git add .
git commit -m "Implementar practica 3 CI/CD"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/practica3-cicd-elian.git
git push -u origin main
```

Reemplaza TU_USUARIO por tu cuenta real. Inicia sesión si Git lo solicita. Si no tienes identidad configurada, ejecuta git config --global user.name con tu nombre y git config --global user.email con tu correo, y repite el commit. No copies el proyecto sobre tu laboratorio anterior.

## 3. Activar Pages

Repositorio > Settings > Pages > Build and deployment > Source: GitHub Actions. Abre Actions > CI/CD > Run workflow > main > Run workflow si la primera ejecución falló antes de activar Pages. Espera los dos jobs en verde. La URL definitiva aparece en el job de despliegue y en Settings > Pages.

## 4. Demostración roja (obligatoria)

Con la primera ejecución correcta guardada, abre tests/app.test.js. En la prueba GET /health cambia SOLO:

```js
expect(r.body.estado).toBe('ok');
```

por:

```js
expect(r.body.estado).toBe('fallo-intencional');
```

Guarda y ejecuta npm test: debe fallar. Luego:

```powershell
git add tests/app.test.js
git commit -m "Demo: provocar prueba fallida"
git push
```

Espera Actions rojo. Captura el resumen y el error de la prueba. El despliegue debe estar omitido; la página publicada anteriormente puede seguir disponible.

## 5. Corregir y demostrar verde

Devuelve la línea a `expect(r.body.estado).toBe('ok');`, guarda y ejecuta npm test. Después:

```powershell
git add tests/app.test.js
git commit -m "Corregir prueba y recuperar pipeline"
git push
```

Espera ambos jobs verdes y toma la captura. No entregues con la prueba intencionalmente rota.

## 6. Evidencias y entrega

- URL real del repositorio público.
- Captura de Actions rojo con la aserción fallida.
- Captura de Actions verde: pruebas, Docker y despliegue.
- Captura de cobertura en el log o el reporte HTML del artefacto.
- Captura de Pages abierto: crear, completar y eliminar.
- Completa los campos pendientes de docs/INFORME_IMPLEMENTACION.md con tus URLs y capturas.
- Graba el video siguiendo docs/GUION_VIDEO.md y súbelo a YouTube como permita el docente; pega el enlace real en el informe.

No se incluyen capturas ficticias ni enlaces de despliegue sin verificar.
