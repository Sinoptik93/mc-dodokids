import { promises as fs } from 'fs';
import path from 'path';
import type { AstroIntegration } from 'astro';
import log from '../utils/logger';
import kleur from 'kleur';

const isDirectory = async (filePath: string) => (await fs.stat(filePath)).isDirectory();

const getFiles = async (dir: string) => await fs.readdir(dir);

const flattenPath = (parentPath: string, file: string) => (parentPath ? `${parentPath}--${file}` : file);

const generateNewFileName = (distDir: string, parentPath: string) => {
    const parts = parentPath.split('--');
    return parts.length > 1
        ? path.join(distDir, `${parts[0]}__${parts.slice(1).join('--')}.html`)
        : path.join(distDir, `${parentPath.replace(/--$/, '')}.html`);
};

const ensureDirectoryExists = async (filePath: string) => {
    const dir = path.dirname(filePath);
    if (!await fs.access(dir).then(() => true).catch(() => false)) {
        await fs.mkdir(dir, { recursive: true });
    }
};

const flattenDirectory = async (directory: string, parentPath = '', distDir: string) => {
    const files = await getFiles(directory);

    await Promise.all(
        files.map(async (file) => {
            const fullPath = path.join(directory, file);

            if (await isDirectory(fullPath)) {
                if (file !== 'landingsAssets') {
                    await flattenDirectory(fullPath, flattenPath(parentPath, file), distDir);
                    try {
                        await fs.rmdir(fullPath);
                    } catch {
                        // Ignore error
                    }
                }
            } else if (file.endsWith('index.html')) {
                const newFileName = generateNewFileName(distDir, parentPath);
                await ensureDirectoryExists(newFileName);
                await fs.rename(fullPath, newFileName);

                const relativeOldPath = path.relative(process.cwd(), fullPath);
                const relativeNewPath = path.relative(process.cwd(), newFileName);

                log.withDate(`${kleur.blue('[rename]')} from: ${kleur.magenta(relativeOldPath)} to: ${kleur.green(relativeNewPath)}`);
            }
        })
    );
};

const flattenHTML = (distDirectoryPath = ''): AstroIntegration => ({
    name: 'flatten-plugin',
    hooks: {
        'astro:build:done': async ({ dir, pages, logger }) => {
            log.heading('paths rename');
            await flattenDirectory(dir.pathname, '', path.join(dir.pathname, distDirectoryPath));
            log.withDate(kleur.green(`✓ Renamed ${pages.length} pages.\n`));
        },
    },
});

export { flattenHTML };
