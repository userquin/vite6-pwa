import {
    type Connect,
    type Plugin,
    type PluginOption,
    createServerModuleRunner,
    defineConfig,
} from 'vite'

import { VitePWA } from '../../server'

export default defineConfig((env) => ({
    clearScreen: false,
    appType: 'custom',
    server: {
        fs: {
            allow: ['.', '../../server']
        }
    },
    plugins: [
        vitePluginSsrMiddleware({
            entry: '/src/entry-server',
            preview: new URL('./dist/server/index.js', import.meta.url).toString(),
        }),
        {
            name: 'global-server',
            configureServer(server) {
                Object.assign(globalThis, { __globalServer: server })
            },
        },
        VitePWA({
            registerType: 'autoUpdate',
            injectRegister: null,
            includeAssets: ['favicon.svg', 'vite.svg'],
            workbox: {
                globPatterns: ['**/*.{js,css,html,png}'],
            },
            manifest: {
                name: 'Vite PWA',
                short_name: 'VitePWA',
                theme_color: '#ffffff',
                icons: [
                    {
                        src: '/pwa-192x192.png',
                        sizes: '192x192',
                        type: 'image/png',
                    },
                    {
                        src: '/pwa-512x512.png',
                        sizes: '512x512',
                        type: 'image/png',
                    },
                ],
            },
            devOptions: {
                enabled: true,
                suppressWarnings: true,
            }
        })
    ],
    environments: {
        client: {
            build: {
                minify: false,
                sourcemap: true,
                outDir: 'dist/client',
            },
        },
        ssr: {
            build: {
                outDir: 'dist/server',
                // [feedback]
                // is this still meant to be used?
                // for example, `ssr: true` seems to make `minify: false` automatically
                // and also externalization.
                ssr: true,
                rollupOptions: {
                    input: {
                        index: '/src/entry-server',
                    },
                },
            },
        },
    },

    builder: {
        async buildApp(builder) {
            await builder.build(builder.environments.client)
            await builder.build(builder.environments.ssr)
        },
    },
}))

// vavite-style ssr middleware plugin
export function vitePluginSsrMiddleware({
    entry,
    preview,
}: {
    entry: string
    preview?: string
}): PluginOption {
    const plugin: Plugin = {
        name: vitePluginSsrMiddleware.name,

        configureServer(server) {
            const runner = createServerModuleRunner(server.environments.ssr)
            const handler: Connect.NextHandleFunction = async (req, res, next) => {
                try {
                    const mod = await runner.import(entry)
                    await mod['default'](req, res, next)
                } catch (e) {
                    next(e)
                }
            }
            return () => server.middlewares.use(handler)
        },

        async configurePreviewServer(server) {
            if (preview) {
                const mod = await import(preview)
                return () => server.middlewares.use(mod.default)
            }
            return
        },
    }
    return [plugin]
}
