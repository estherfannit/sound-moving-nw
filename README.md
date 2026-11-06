# Sound Moving NW · Website Design Options

React (Vite) app that shows the five design options (A–E), each with nine pages.

## Run locally

    npm install
    npm run dev        # http://localhost:5173
    npm run build      # outputs dist/

## Content

- `design/source/*.dc.html`: the original design files for each option.
- `src/content/options.json`: the content the app renders, generated from the design files.
- `scripts/export-content.cjs`: regenerates `src/content/options.json`. Run `npm run export-content` after changing the design files.
- `public/assets/`: photos and the logo, served at `/assets/...`.

## Structure

- `/`: overview of the five options.
- `/option/:letter`: an option's landing page with its nine pages.
- `/option/:letter/:slug`: one page, for example `/option/a/home` or `/option/c/services-residential-moving`.

The bottom switcher keeps the reviewer on the same page when switching options.
