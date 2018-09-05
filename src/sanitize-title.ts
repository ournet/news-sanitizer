import { getSupportedLanguages, readTitles, escapeRegExp } from "./data";

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
    const parts = title.split(END_SEPARATOR);

    if (parts.length < 2) {
        return title;
    }

    const maxLength = data.maxWordLength * 2;
    const segments: string[] = []
    let segmentLength = 0;

    for (let i = parts.length - 1; i >= 0; i--) {
        const part = parts[i];
        const l = segmentLength + part.length + 1;

        if (l < maxLength && l < title.length / 1.5) {
            segments.push(part);
            segmentLength += part.length + 1;
        } else {
            break;
        }
    }
    if (!segmentLength) {
        return title;
    }
    const segment = segments.reverse().join(' ');

    const regResult = data.reg.exec(segment);

    if (!regResult) {
        return title;
    }

    title = title.substr(0, title.length - segment.length - 1).trim();

    return title;
}

function sanitizeTitleStart(title: string, data: DataItem) {
    const parts = title.split(START_SEPARATOR);

    if (parts.length < 2) {
        return title;
    }

    const maxLength = data.maxWordLength * 2;
    let segment = '';
    for (const part of parts) {
        const l = segment.length + part.length + 1;
        if (l < maxLength && l < title.length / 1.5) {
            segment = segment ? (segment + ' ' + part) : part;
        } else {
            break;
        }
    }
    if (!segment) {
        return title;
    }

    const regResult = data.reg.exec(segment);

    if (!regResult) {
        return title;
    }

    title = title.substr(segment.length + 1).trim();

    return title;
}

function getItem(lang: string) {
    const lines = (readTitles(lang) || []).map(escapeRegExp);
    if (!lines.length) {
        return null;
    }
    return {
        reg: new RegExp('\\b(' + lines.join('|') + ')\\b', 'i'),
        maxWordLength: lines.reduce<number>((max, current) => current.length > max ? current.length : max, 0),
    }
}

const START_SEPARATOR = new RegExp('[' + escapeRegExp(':|/)-].') + ']', 'g');
const END_SEPARATOR = new RegExp('[' + escapeRegExp(':|/(-[.') + ']', 'g');

const CACHE: { [key: string]: DataItem | null } = {};

type DataItem = {
    reg: RegExp
    maxWordLength: number
}
