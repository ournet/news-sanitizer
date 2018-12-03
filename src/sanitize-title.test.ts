
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

test('end: — видео', t => {
    t.is(sanitizeTitle('В России начали распечатывать торты на 3D- принтере — видео', 'ru'),
        'В России начали распечатывать торты на 3D- принтере');
})

test('Exclusive! ', t => {
    t.is(sanitizeTitle(`Exclusive! This SIGNATURE dialogue of Ajay Devgn's Singham will be a part of Ranveer Singh's Simmba`, 'en'),
        `This SIGNATURE dialogue of Ajay Devgn's Singham will be a part of Ranveer Singh's Simmba`);
})

test('[VIDEO] ', t => {
    t.is(sanitizeTitle(`[VIDEO] First single Thandaane Thandaane from Ram Charan’s Vinaya Vidheya Rama is out now`, 'en'),
        `First single Thandaane Thandaane from Ram Charan’s Vinaya Vidheya Rama is out now`);
})
