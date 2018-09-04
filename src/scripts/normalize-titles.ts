import { getSupportedLanguages, readTitles, writeTitles } from "../data";

async function normalize() {

    const languages = getSupportedLanguages();

    for (const lang of languages) {
        const titles = await readTitles(lang);
        await writeTitles(lang, titles);
    }

}

normalize()
