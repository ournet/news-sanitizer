import { getSupportedLanguages } from "./data";

export function sanitizeTitle(title: string, lang: string) {
    if (!title || getSupportedLanguages().indexOf(lang) < 0) {
        return title;
    }


}
