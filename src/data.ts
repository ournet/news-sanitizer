
import { join } from 'path';
import { readFileSync, writeFileSync } from 'fs';

export function getSupportedLanguages() {
    return ['ro', 'ru', 'bg', 'en', 'it', 'hu', 'cs'];
}

export function getDataTitlesPath(lang: string) {
    if (!/^[a-z]{2}$/.test(lang)) {
        throw new Error(`Invalid lang: ${lang}`);
    }
    return join(__dirname, '..', 'data', lang, 'title.txt');
}

export function readDataTitles(lang: string) {
    const path = getDataTitlesPath(lang);

    const data = readFileSync(path, 'utf8');
    const list = data.split(/\s*\n\s*/g).filter(item => item.trim().length > 0);

    return list;
}

export function writeDataTitles(lang: string, titles: string[]) {
    const path = getDataTitlesPath(lang);
    titles = titles.filter(item => item && item.trim().length > 0)
        .map(item => item.trim());

    titles = titles.sort();

    writeFileSync(path, '\n' + titles.join('\n') + '\n', 'utf8');
}

export function getDataBodyPath(lang: string) {
    if (!/^[a-z]{2}$/.test(lang)) {
        throw new Error(`Invalid lang: ${lang}`);
    }
    return join(__dirname, '..', 'data', lang, 'body.txt');
}

const DATA_BODY_ITEM_TYPES = ['end', 'line'] as ReadonlyArray<DataBodyItemType>;
export type DataBodyItemType = 'end' | 'line';
export type DataBodyItem = {
    text: string
    type: DataBodyItemType
}

const BODY_TYPE_REG = /^---(end|line)/i;

export function readDataBody(lang: string): DataBodyItem[] {
    const path = getDataBodyPath(lang);

    const data = readFileSync(path, 'utf8');
    const items = data.split(/\s*\n\s*/g).filter(item => item.trim().length > 0);
    let currentType: DataBodyItemType | null = null;
    const result: DataBodyItem[] = [];

    for (const item of items) {
        const typeResult = BODY_TYPE_REG.exec(item);
        if (typeResult) {
            currentType = typeResult[1] as DataBodyItemType;
            continue;
        }

        if (!currentType) {
            continue;
        }

        result.push({
            text: item,
            type: currentType,
        });
    }

    return result;
}

export function writeDataBody(lang: string, data: DataBodyItem[]) {
    const path = getDataBodyPath(lang);

    let lines: string[] = [];
    lines.push('');

    for (const type of DATA_BODY_ITEM_TYPES) {
        lines.push('---' + type);
        lines.push('');
        lines = lines.concat(data.filter(item => item.type === type).map(item => item.text.trim()));
        lines.push('');
    }

    writeFileSync(path, lines.join('\n'), 'utf8');
}

export function escapeRegExp(str: string) {
    return str.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$1');
}
