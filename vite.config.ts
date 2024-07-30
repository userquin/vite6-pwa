import { defineConfig} from "vite";
import { VitePWA } from "./server"

export default defineConfig({
    plugins: [
      VitePWA({
        registerType: 'autoUpdate',
        injectRegister: 'auto',
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
    })]
})
