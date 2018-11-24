
import test from 'ava';
import { sanitizeTitle } from './sanitize-title';

test('start: one word upper case', t => {
    t.is(sanitizeTitle('VIDEO.Titlu stire', 'ro'), 'Titlu stire');
    t.is(sanitizeTitle('VIDEO / Titlu stire', 'ro'), 'Titlu stire');
})

test('start: one word lower case', t => {
    t.is(sanitizeTitle('video.Titlu stire', 'ro'), 'Titlu stire');
    t.is(sanitizeTitle('video / Titlu stire', 'ro'), 'Titlu stire');
})

test('start: one word normal case', t => {
    t.is(sanitizeTitle('Video.Titlu stire', 'ro'), 'Titlu stire');
    t.is(sanitizeTitle(' Video / Titlu stire', 'ro'), 'Titlu stire');
})

test('start: many words upper case', t => {
    t.is(sanitizeTitle('SUPER VIDEO.Titlu stire', 'ro'), 'Titlu stire');
    t.is(sanitizeTitle('Wow! VIDEO / Titlu stire', 'ro'), 'Titlu stire');
})

test('start: many words lower case', t => {
    t.is(sanitizeTitle('wow video.Titlu stire', 'ro'), 'Titlu stire');
    t.is(sanitizeTitle('s-a video / Titlu stire', 'ro'), 'Titlu stire');
})

test('start: many words normal case', t => {
    t.is(sanitizeTitle('Super Video.Titlu stire', 'ro'), 'Titlu stire');
    t.is(sanitizeTitle(' Wow! Video / Titlu stire', 'ro'), 'Titlu stire');
})

test('end: one word upper case', t => {
    t.is(sanitizeTitle('Titlu stire  - VIDEO', 'ro'), 'Titlu stire');
    t.is(sanitizeTitle('Titlu stire (FOTO)', 'ro'), 'Titlu stire');
})

test('end: one word lower case', t => {
    t.is(sanitizeTitle('Titlu stire [foto]', 'ro'), 'Titlu stire');
    t.is(sanitizeTitle('Titlu stire (reportaj)', 'ro'), 'Titlu stire');
})

test('end: many words upper case', t => {
    t.is(sanitizeTitle('Titlu stire. FOTO & VIDEO', 'ro'), 'Titlu stire');
    t.is(sanitizeTitle('Titlu stire / Wow! VIDEO', 'ro'), 'Titlu stire');
})

test('start: multiple separators', t => {
    t.is(sanitizeTitle('Video ///Titlu stire', 'ro'), 'Titlu stire');
})

test('end: multiple separators', t => {
    t.is(sanitizeTitle('Titlu stire || VIDEO', 'ro'), 'Titlu stire');
})
