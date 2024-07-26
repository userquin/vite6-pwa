/// <reference types="vite/client" />

declare module 'virtual:pwa-register' {
    export interface RegisterSWOptions {
        immediate?: boolean
        onNeedRefresh?: () => void
        onOfflineReady?: () => void
        /**
         * Called only if `onRegisteredSW` is not provided.
         *
         * @deprecated Use `onRegisteredSW` instead.
         * @param registration The service worker registration if available.
         */
        onRegistered?: (registration: ServiceWorkerRegistration | undefined) => void
        /**
         * Called once the service worker is registered (requires version `0.12.8+`).
         *
         * @param swScriptUrl The service worker script url.
         * @param registration The service worker registration if available.
         */
        onRegisteredSW?: (swScriptUrl: string, registration: ServiceWorkerRegistration | undefined) => void
        onRegisterError?: (error: any) => void
    }

    /**
     * Registers the service worker returning a callback to reload the current page when an update is found.
     *
     * @param options the options to register the service worker.
     * @return (reloadPage?: boolean) => Promise<void> From version 0.13.2+ `reloadPage` param is not used anymore.
     */
    export function registerSW(options?: RegisterSWOptions): (reloadPage?: boolean) => Promise<void>
}
