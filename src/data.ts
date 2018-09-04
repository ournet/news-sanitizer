
import { join } from 'path';
import { readFile, writeFile } from 'fs';

export function getSupportedLanguages() {
    return ['ro'];
}

export function getTitlesPath(lang: string) {
    if (!/^[a-z]{2}$/.test(lang)) {
        throw new Error(`Invalid lang: ${lang}`);
    }
    return join(__dirname, '..', 'data', lang, 'title.txt');
}

export function readTitles(lang: string): Promise<string[]> {
    const path = getTitlesPath(lang);

    return new Promise((resolve, reject) => {
        readFile(path, 'utf8', (error, data) => {
            if (error) {
                return reject(error);
            }
            const list = data.split(/\s*\n\s*/g).filter(item => item.trim().length > 0);
            resolve(list);
        })
    })
}

export function writeTitles(lang: string, titles: string[]): Promise<void> {
    const path = getTitlesPath(lang);
    titles = titles.filter(item => item && item.trim().length > 0)
        .map(item => item.trim());

    titles = titles.sort();

    return new Promise((resolve, reject) => {
        writeFile(path, '\n' + titles.join('\n') + '\n', 'utf8', error => {
            if (error) {
                return reject(error);
            }
            resolve();
        })
    })
}

export function escapeRegExp(str: string) {
    return str.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
}
