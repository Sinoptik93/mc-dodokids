/// <reference types="astro/client" />


interface ImportMetaEnv {
    readonly VITE_LOCAL_BASE_URL_HOST: string;
    readonly VITE_DEV_STAND_BASE_URL_HOST: string;
    readonly VITE_PAGE_ROUTE: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
