import * as path from 'path';
import {fileURLToPath} from 'url';

import {getMarkdownFilesPath, parseMarkdownFiles} from "./utils";
import {logArtifactsRoutes} from "./hookLoggers";
import {locationSchema} from '../../src/content/schemas';

import type {AstroIntegration} from "astro";
import type {CountriesLanguages} from "./types";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const CONTENTS_DIR = path.join(__dirname, '../..', 'src/content');

const markdownFiles = getMarkdownFilesPath(CONTENTS_DIR);
const parsedMarkdownFiles = parseMarkdownFiles(markdownFiles, locationSchema);
const countryLanguages = parsedMarkdownFiles
    .reduce<CountriesLanguages>((acc, {data}) => {
        const {localeSlug, country, isDefaultLanguage} = data;

        if (!acc[country]) {
            acc[country] = { languages: [] };
        }

        acc[country].languages.push({
            locale: localeSlug,
            isDefault: isDefaultLanguage
        });

        return acc;
    }, {});


const routesLogger = () => {
    const integration: AstroIntegration = {
        name: "astro-lifecycle-logs",
        hooks: {
            "astro:build:done": (data) => {
                logArtifactsRoutes(data, countryLanguages);
            }
        },
    };

    return integration;
};

export {routesLogger};
