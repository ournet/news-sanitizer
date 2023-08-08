import { getSupportedLanguages, readDataBody, DataBodyItemType } from "./data";

type CacheData = { reg: RegExp; type: DataBodyItemType }[];
const CACHE: { [lang: string]: CacheData } = {};

function getDataBody(lang: string) {
  if (!CACHE[lang]) {
    CACHE[lang] = readDataBody(lang).map((item) => ({
      reg: new RegExp("^" + item.text + "(?:\\s|\\b|$)", "i"),
      type: item.type
    }));
  }

  return CACHE[lang];
}

export function sanitizeArticle(article: string, lang: string) {
  if (!article || getSupportedLanguages().indexOf(lang) < 0) {
    return article;
  }

  const lines = article.trim().split(/\s*\n\s*/g);

  const bodyData = getDataBody(lang);

  const newLines = processLines(lines, bodyData);

  return newLines.join("\n");
}

function processLines(lines: string[], data: CacheData): string[] {
  const newLines: string[] = [];
  for (let i = 0; i < lines.length; i++) {
    let passFilters = true;
    for (const dataItem of data) {
      if (dataItem.reg.test(lines[i])) {
        if (dataItem.type === "line") {
          passFilters = false;
          break;
        } else if (dataItem.type === "end") {
          return processLines(newLines, data);
        }
      }
    }
    if (passFilters) {
      newLines.push(lines[i]);
    }
  }

  return newLines;
}
