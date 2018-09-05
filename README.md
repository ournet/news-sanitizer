# news-sanitizer

Sanitize news title and body.

## Usage

```ts

import { sanitizeTitle } from 'news-sanitizer';

const lang = 'ro';
const title = '(VIDEO) Alegerile parlamentare au avot loc cu incalcari';

const newTitle = sanitizeTitle(title, lang);
// newTitle = "Alegerile parlamentare au avot loc cu incalcari"

```
