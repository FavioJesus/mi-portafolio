# Portfolio UI Kit

A complete, single-page developer portfolio. This folder holds the page's JavaScript; the entry HTML is **`/Portfolio.html`** at the project root (it must live at the root so the drag-and-drop image slots persist).

## Run it
Open **`/Portfolio.html`**. It loads `styles.css` (the design system) plus the files here.

## Edit your content
All text lives in **`data.js`** as `window.PORTFOLIO_DATA`, with `es` and `en` objects. Replace:
- `meta.name` / `meta.initials` — your name and monogram.
- `hero`, `about`, `education`, `languages`, `work`, `research`, `experience`, `contact` — your real info.
- Language & project cards: set `href` to your hosted PDF / project URL. An empty `href` hides the download link.

Keep the `es` and `en` versions in sync.

## Images
The hero photo, project previews, and language/certificate references are **`<image-slot>`** elements — drag an image file onto them in the browser and it persists (stored in a sidecar at the project root). Each slot has a unique `id`.

## Files
- `data.js` — bilingual content (plain JS global).
- `primitives.jsx` — page building blocks (`Button`, `Tag`, `ProjectCard`, `TimelineItem`, `LanguageCard`, `ContactRow`, `SectionHeading`), assigned to `window`. These mirror the design-system components in `/components/`, adapted to use image slots.
- `sections.jsx` — full page sections (`Nav`, `Hero`, `About`, `Education`, `Languages`, `Work`, `Research`, `Experience`, `Contact`).
- `tweaks-panel.jsx`, `image-slot.js` — starters.

## Tweaks
Toggle **Tweaks** from the toolbar to change accent color, hero layout (cover / split / stacked / minimal), photo visibility, and surface tone (light / warm).
