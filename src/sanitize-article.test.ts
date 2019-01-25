
import test from 'ava';
import { sanitizeArticle } from './sanitize-article';


test('remove ---line', t => {
    t.is(sanitizeArticle('ceva text \nCiteste si', 'ro'), 'ceva text');
    t.is(sanitizeArticle('ceva text \nCitește și despre...', 'ro'), 'ceva text');
})


test('remove multi ---line', t => {
    t.is(sanitizeArticle('ceva text \nCiteste si ceva \n Alt text\nCiteste si...', 'ro'), 'ceva text\nAlt text');
})

test('remove ---end', t => {
    t.is(sanitizeArticle('ceva text \nCiteste mai departe...', 'ro'), 'ceva text');
})

test('remove ---end & --line', t => {
    t.is(sanitizeArticle('ceva text \nCiteste si ceva \n Alt text\nCiteste si... \nCiteste mai departe', 'ro'), 'ceva text\nAlt text');
})
