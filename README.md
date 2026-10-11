# Denim accessories website (static)
A single-page, no-backend site: hero, categories with working filters, product grid with detail dialog, story, materials, ordering steps, contact, footer. Enquiries go to WhatsApp.

## Files
```
index.html        page structure and draft copy
css/style.css     colours, fonts, layout (see :root at the top)
js/script.js      CONFIG (brand, contacts) and PRODUCTS data
images/README.md  photo replacement guide
```
## Run locally
Double-click `index.html`. No install needed. (Google Fonts need internet; fallback fonts are used offline.)

## Common edits
- **Brand name:** `BRAND_NAME` in `js/script.js`, plus the `[BRAND NAME]` text in `index.html` `<title>` and meta tags.
- **Wordmark:** the `.wordmark` link in `index.html` (small inline SVG + text).
- **WhatsApp / Instagram / email:** `CONFIG` in `js/script.js`. Number is digits only with country code, e.g. `919876543210`. Unset items are disabled, with a reminder shown.
- **Announcement bar:** `ANNOUNCEMENT`; set to `""` to hide.
- **Products:** edit the `PRODUCTS` array (add or delete an object). Category must match a name in `CATEGORIES`. Prices are provisional.
- **Photos:** see `images/README.md`.
- **Colours / fonts:** variables in `:root` in `css/style.css`; font link in `index.html`.
- **Story, materials, policies:** edit text in `index.html`. Policies are placeholders.

## Publish
- **GitHub Pages:** push the folder to a repo, then Settings > Pages > deploy from the `main` branch root.
- **Netlify:** drag the folder onto app.netlify.com/drop.

## Needs an external service
Only Google Fonts (optional) and WhatsApp/Instagram links. There is no contact form, on purpose.

## Before launch
Replace: brand name, contact details, prices, product details, photos, og:image, policies (have them reviewed). Do not add sustainability, recycled-denim, or manufacturing claims until confirmed.
Not browser-tested yet: please open it on desktop and phone and check.
