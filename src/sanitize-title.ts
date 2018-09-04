import { getSupportedLanguages, readTitles, escapeRegExp } from "./data";

export function sanitizeTitle(title: string, lang: string) {
    if (!title || getSupportedLanguages().indexOf(lang) < 0) {
        return title;
    }

    if (CACHE[lang] === undefined) {
        CACHE[lang] = getRegExp(lang);
    }

    const item = CACHE[lang];

    if (item === null) {
        return title;
    }

    let regRezult = item.start.exec(title);
    if (regRezult) {
        const index = regRezult.index + regRezult[0].length;
        if (index <= item.maxLine) {
            title = title.substr(index);
        }
    }
    regRezult = item.end.exec(title);
    if (regRezult) {
        const index = regRezult.index;
        if (title.length - index <= item.maxLine) {
            title = title.substr(0, index);
        }
    }

    return title;
}

function getRegExp(lang: string) {
    const lines = (readTitles(lang) || []).map(escapeRegExp);
    if (!lines.length) {
        return null;
    }
    return {
        start: new RegExp('\\b(' + lines.join('|') + ')\\s*' + START_SEPARATOR + '\\s*', 'i'),
        end: new RegExp('\\s*' + END_SEPARATOR + '\\s*(' + lines.join('|') + ')\\b', 'i'),
        maxLine: lines.reduce<number>((max, current) => current.length > max ? current.length : max, 0) + 3,
    }
}

const START_SEPARATOR = '[' + escapeRegExp(':|/)-].') + ']';
const END_SEPARATOR = '[' + escapeRegExp(':|/(-[.') + ']';

const CACHE: { [key: string]: DataItem | null } = {};

type DataItem = {
    start: RegExp
    end: RegExp
    maxLine: number
}
