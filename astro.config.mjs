import { defineConfig, sharpImageService } from 'astro/config';
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import mdx from "@astrojs/mdx";
import svgr from 'vite-plugin-svgr';


// https://astro.build/config
export default defineConfig({
    site: 'https://sinoptik93.github.io',
    base: 'mc-dodokids',
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
