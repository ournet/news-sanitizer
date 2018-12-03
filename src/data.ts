
import { join } from 'path';
import { readFileSync, writeFileSync } from 'fs';

export function getSupportedLanguages() {
    return ['ro', 'ru', 'bg', 'en'];
}

export function getTitlesPath(lang: string) {
    if (!/^[a-z]{2}$/.test(lang)) {
        throw new Error(`Invalid lang: ${lang}`);
    }
    return join(__dirname, '..', 'data', lang, 'title.txt');
}

export function readTitles(lang: string) {
    const path = getTitlesPath(lang);

    const data = readFileSync(path, 'utf8');
    const list = data.split(/\s*\n\s*/g).filter(item => item.trim().length > 0);

    return list;
}

export function writeTitles(lang: string, titles: string[]) {
    const path = getTitlesPath(lang);
    titles = titles.filter(item => item && item.trim().length > 0)
        .map(item => item.trim());

    titles = titles.sort();

    writeFileSync(path, '\n' + titles.join('\n') + '\n', 'utf8');
}

export function escapeRegExp(str: string) {
    return str.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$1');
}
