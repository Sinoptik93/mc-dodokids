import { defineConfig } from 'astro/config';
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import mdx from "@astrojs/mdx";
import svgr from 'vite-plugin-svgr';


// https://astro.build/config
export default defineConfig({
    integrations: [
        react(),
        mdx(),
        tailwind(),
    ],
    vite: {
        plugins: [
            svgr(),
        ],
    },
});
