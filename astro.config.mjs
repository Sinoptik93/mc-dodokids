import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import mdx from "@astrojs/mdx";
import svgr from "vite-plugin-svgr";
import { lifecycleLogs } from "./integrations";


// https://astro.build/config
export default defineConfig({
    site: "https://sinoptik93.github.io",
    base: 'mc-dodokids',
    integrations: [
        react(),
        mdx(),
        tailwind(),
        lifecycleLogs(),
    ],
    vite: {
        build: {
            assetsInlineLimit: 7168,
        },
        plugins: [
            svgr(),
        ],
    },
    build: {
        assets: "landingKidsAssets",
        format: "file",
    },
});
