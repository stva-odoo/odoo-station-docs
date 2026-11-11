# Odoo Station docs

How to set up an Android device as a fully locked Station: QR code, NFC tag or ADB.

Published at https://stva-odoo.github.io/odoo-station-docs/

## Edit

```sh
npm install
npm run dev
```

| To change | Edit |
|---|---|
| A page | `docs/<page>.md`, and its translation in `docs/<language>/<page>.md` |
| A command | `docs/snippets/`, shared by every language |
| The "no account" reminder | `docs/<language>/parts/no-account.md` |
| The site address, the APK address, the signature checksum, the package | `docs/.vitepress/station.js` |
| The labels of the form | `docs/.vitepress/lib/messages.js` |
| The menu, the languages | `docs/.vitepress/config.js` |

## Add a language

1. Copy the English pages into `docs/<language>/` and translate them. Keep the `{#anchors}` of the headings as they are.
2. Add the language to `languages` in `docs/.vitepress/config.js`.
3. Add its labels to `docs/.vitepress/lib/messages.js`.

Pushing to `main` publishes the site.
