# Publicar en GitHub Pages

Este proyecto incluye una versión estática especial para GitHub Pages, porque la versión principal usa TanStack Start/SSR y GitHub Pages solo sirve archivos estáticos.

## Archivos agregados o ajustados

- `.github/workflows/deploy-pages.yml`: workflow automático de despliegue.
- `vite.github-pages.config.ts`: configuración de build estático para GitHub Pages.
- `index.github-pages.html`: HTML base para la versión estática.
- `src/github-pages.tsx`: entrada React de la versión estática.
- `package.json`: script `build:pages`.
- `vite.config.ts`: base dinámica para builds bajo `/<repositorio>/`.
- `src/router.tsx`: basepath dinámico para despliegues bajo subcarpeta.

## Pasos para publicar

1. Sube todos los archivos del proyecto a tu repositorio de GitHub.
2. Entra al repositorio en GitHub.
3. Ve a `Settings` → `Pages`.
4. En `Build and deployment`, cambia `Source` a `GitHub Actions`.
5. Ve a la pestaña `Actions`.
6. Ejecuta manualmente el workflow `Deploy to GitHub Pages` o haz un `push` a la rama `main`.
7. Cuando termine correctamente, vuelve a `Settings` → `Pages`.
8. Allí aparecerá el enlace final del sitio.

La URL normalmente tendrá este formato:

```txt
https://TU-USUARIO.github.io/NOMBRE-DEL-REPOSITORIO/
```

Si tu rama principal se llama `master` y no `main`, cambia esta línea dentro de `.github/workflows/deploy-pages.yml`:

```yml
branches: ["main"]
```

por:

```yml
branches: ["master"]
```

## Probar el build de GitHub Pages localmente

```bash
npm install
npm run build:pages
```

El resultado se genera en:

```txt
dist-pages/
```
