import defaultTheme from 'tailwindcss/defaultTheme';
// @ts-ignore
import tailwindAnimated from "tailwindcss-animated";
import {nextui} from '@nextui-org/react';

import {Config} from 'tailwindcss'

export default {
    content: [
        './src/**/*.{astro,md,mdx,ts,tsx}',
        './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        container: {
            center: true,
            screens: {
                xs: '100%',
                sm: '592px',
                md: '768px',
                lg: '1024px',
                xl: '1352px',
                '2xl': '1536px',
            },
            padding: {
                DEFAULT: '1rem',
                // xs: '1rem',
                // sm: '1.5rem',
                // md: '0.5rem',
                // lg: '2rem',
                // xl: '4rem',
                // '2xl': '4rem',
            }
        },
        extend: {
            fontFamily: {
                regular: ['DodoRounded v2 Regular', ...defaultTheme.fontFamily.sans],
                bold: ['DodoRounded v2 Bold', ...defaultTheme.fontFamily.sans],
                black: ['DodoRounded v2 Black', ...defaultTheme.fontFamily.sans],
            },
            borderRadius: {
                '4xl': '40px',
                '5xl': '50px',
                '6xl': '60px',
                '7xl': '70px',
                '8xl': '80px',
            },

            colors: {
                orange: {
                    DEFAULT: 'hsl(26,100%,50%)',
                },
                purple: {
                    DEFAULT: 'hsl(257,66%,51%)',
                },
                neutral: {
                    DEFAULT: 'hsl(0,0%,11%)',
                },
                red: {
                    DEFAULT: 'hsl(15,99%,47%)',
                }
            }
        },
    },
    darkMode: 'class',
    plugins: [
        tailwindAnimated,
        nextui
    ],
} satisfies Config;
