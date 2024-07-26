# Vite 6 + Vite PWA

First test to see if Vite 6 works with Vite PWA, this repository has a copy of all modules in [vite-plugin-pwa](https://github.com/vite-pwa/vite-plugin-pwa):
- `src` folder: Vanilla TypeScript code to run the PWA
- `server` folder: contains the PWA plugin modules to run playground in src folder
- `server/client` folder: JavaScript templates from pwa plugin `dist/client` folder

## Changes

This repository has the following changes in `server/plugins` folder:
- changed all `server.ws` calls to `server.environments.client.hot`

I have no idea how to add `workbox-window` to `ssr.noExternal`, code in [main plugin](./server/plugins/main.ts).

Some warnings about deprecated `vite` functions, not yet tested in [pwa-assets plugin][./server/plugins/pwa-assets.ts]:
- `handleHotUpdate`
- `server.moduleGraph.getModuleById`
