/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />
/// <reference types="vite-plugin-svgr/client" />

interface ImportMetaEnv {
    readonly PUBLIC_GOOGLE_API_KEY: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
