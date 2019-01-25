import { getSupportedLanguages, readDataTitles, escapeRegExp } from "./data";

export function sanitizeTitle(title: string, lang: string) {
    if (!title || getSupportedLanguages().indexOf(lang) < 0) {
        return title;
    }

    if (CACHE[lang] === undefined) {
        CACHE[lang] = getItem(lang);
    }

    const item = CACHE[lang];

    if (item === null) {
        return title;
    }

    title = sanitizeTitleStart(title, item);
    title = sanitizeTitleEnd(title, item);

    return title;
}

function sanitizeTitleEnd(title: string, data: DataItem) {
    const reversedTitle = title.split('').reverse().join('');
    let segment = getTitleSegment(reversedTitle, data.maxWordLength + 4, END_SEPARATORS.map(item => item.split('').reverse().join('')));
    if (!segment) {
        return title;
    }

    segment = segment.split('').reverse().join('');
    const regResult = data.reg.exec(segment);

    if (!regResult) {
        return title;
    }

    title = title.substr(0, title.length - segment.length).trim();

    let index = END_SEPARATORS.indexOf(title[title.length - 1]);
    while (~index) {
        title = title.substr(0, title.length - 2).trim();
        index = END_SEPARATORS.indexOf(title[title.length - 1]);
    }

    return title;
}

function sanitizeTitleStart(title: string, data: DataItem) {
    const segment = getTitleSegment(title, data.maxWordLength + 4, START_SEPARATORS);
    if (!segment) {
        return title;
    }

    const regResult = data.reg.exec(segment);

    if (!regResult) {
        return title;
    }

    title = title.substr(segment.length).trim();

    let index = START_SEPARATORS.indexOf(title[0]);
    while (~index) {
        title = title.substr(1).trim();
        index = START_SEPARATORS.indexOf(title[0]);
    }

    return title;
}

function getTitleSegment(title: string, maxLength: number, separators: string[]) {
    let lastIndex = -1;
    for (const separator of separators) {
        const index = title.indexOf(separator);
        if (index > 0) {
            const currentIndex = index + separator.length;
            if (lastIndex < currentIndex && currentIndex < maxLength) {
                lastIndex = index + separator.length;
            }
        }
    }
    if (lastIndex > 0) {
        return title.substr(0, lastIndex);
    }
}

function getItem(lang: string) {
    const lines = (readDataTitles(lang) || []).map(escapeRegExp);
    if (!lines.length) {
        return null;
    }
    return {
        reg: new RegExp('(\\b|^|\\s)(' + lines.join('|') + ')(\\b|\\s|$)', 'i'),
        maxWordLength: lines.reduce<number>((max, current) => current.length > max ? current.length : max, 0),
    }
}

const START_SEPARATORS = [': ', '|', '/', ')', ']', '.', '—', '- ', '! '];
const END_SEPARATORS = [' :', '|', '/', '(', '[', '.', '—', ' -'];

const CACHE: { [key: string]: DataItem | null } = {};

type DataItem = {
    reg: RegExp
    maxWordLength: number
}
