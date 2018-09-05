import { getSupportedLanguages } from "./data";

export function sanitizeArticle(article: string, lang: string) {
    if (!article || getSupportedLanguages().indexOf(lang) < 0) {
        return article;
    }

    return article;
}
