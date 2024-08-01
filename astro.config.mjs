import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import mdx from "@astrojs/mdx";
import svgr from "vite-plugin-svgr";
import { routesLogger, flattenHTML } from "./integrations";


// https://astro.build/config
export default defineConfig({
    // site: "https://sinoptik93.github.io",
    // base: 'mc-dodokids',
    integrations: [
        react(),
        mdx(),
        tailwind(),
        routesLogger(),
        flattenHTML('landings/dodoKids'),
    ],
    vite: {
        build: {
            assetsInlineLimit: 7168,
        },
        plugins: [
            svgr(),
        ],
    },
    server: {
        port: 4321
    },
    build: {
        assets: "landingsAssets/dodoKids",
        format: "directory",
    },
});

