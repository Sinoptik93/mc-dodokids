/// <reference types="../env" />
import fs from "fs";
import path from "path";
import {z} from "zod";
import matter from "gray-matter";

interface ParsedFile<T> {
    file: string;
    data: T;
}

export function getMarkdownFilesPath(directory: string): string[] {
    let results: string[] = [];

    const list = fs.readdirSync(directory);

    list.forEach((file) => {
        const filePath = path.join(directory, file);
        const stat = fs.statSync(filePath);

        if (stat && stat.isDirectory()) {
            results = results.concat(getMarkdownFilesPath(filePath));
        } else if (filePath.endsWith('.md')) {
            results.push(filePath);
        }
    });

    return results;
}

export function parseMarkdownFiles<T>(files: string[], schema: z.ZodSchema<T>): ParsedFile<T>[] {
    return files.map((file) => {
        const fileContent = fs.readFileSync(file, 'utf8');
        const parsed = matter(fileContent);
        const validatedData = schema.parse(parsed.data);

        return {
            file,
            data: validatedData,
        };
    });
}

export const getLocalHostUrl = (domain: string, options?: {language?: string; route?: string}) => {
    const DEFAULT_HOST = 'localhost';
    const env = import.meta.env;
    const localHost = env.VITE_LOCAL_BASE_URL_HOST;
    const pageRoute = env?.VITE_PAGE_ROUTE;

    if (!localHost) return DEFAULT_HOST;

    const REPLACE_DOMAIN_SCHEME = '{{DOMAIN}}'
    const localRouteScheme = localHost;

    const baseUrl = localRouteScheme
        .replace(REPLACE_DOMAIN_SCHEME, domain)
        .replace('https://', '');

    const routedPath = path.join(baseUrl, options?.language ?? '', pageRoute ?? '', options?.route ?? '');
    return `https://${routedPath}`;
}

export const getRemoteHostUrl = (domain: string, options?: {language?: string; route?: string}) => {
    const env = import.meta.env;

    const remoteHost = env.VITE_DEV_STAND_BASE_URL_HOST;
    const pageRoute = env?.VITE_PAGE_ROUTE;
    if (!remoteHost) return '';

    const REPLACE_DOMAIN_SCHEME = '{{DOMAIN}}'
    const localRouteScheme = remoteHost;

    // REFACTOR: упростить
    const baseUrl = localRouteScheme
        .replace(REPLACE_DOMAIN_SCHEME, domain)
        .replace('https://', '');

    const routedPath = path.join(baseUrl, options?.language ?? '', pageRoute ?? '', options?.route ?? '');
    return `https://${routedPath}`;
}

export const getEnvironmentHosts = () => {
    const env = import.meta.env;
    const localHost = env?.VITE_LOCAL_BASE_URL_HOST ?? null;
    const remoteHost = env?.VITE_DEV_STAND_BASE_URL_HOST ?? null;

    return {
        localHost,
        remoteHost,
    }
}
