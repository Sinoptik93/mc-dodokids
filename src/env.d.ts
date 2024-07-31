/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />
/// <reference types="vite-plugin-svgr/client" />

interface ImportMetaEnv {
    readonly PUBLIC_GOOGLE_API_KEY: string;
    readonly VITE_PAGE_ROUTE: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
