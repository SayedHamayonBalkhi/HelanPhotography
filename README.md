# Helan Event Photography — website

A light, editorial photography portfolio built with plain HTML, CSS and JavaScript.
No build tools, no database, no server code. Everything you edit is in one file: **content.js**.

## 1. Open it on your computer
Some features (the contact form, fonts) need the site to be served, not just double-clicked.
1. Install Python (or use any simple web server).
2. In this folder run: `python3 -m http.server 8000`
3. Open http://localhost:8000 in your browser.
(Double-clicking `index.html` shows the pages, but the contact form will not send from a `file://` address.)

## 2. What each file does
| File | Purpose |
|---|---|
| `index.html` | Home page (hero, selected work, categories, About, Why Choose Us, testimonial preview, contact form) |
| `work.html` | Portfolio page with category filters. Links like `work.html#wedding` open a category directly |
| `testimonials.html` | Full testimonials page ("What Our Clients Say") |
| `content.js` | **All editable words, categories, photos, testimonials, social links, form settings** |
| `styles.css` | Look and feel: colours, fonts, spacing, layouts (colours are at the top, under "Tokens") |
| `script.js` | Behaviour: menu, galleries, filters, full-screen viewer, form |
| `Photos/` | Your photographs, one folder per category |
| `fonts/` | Cormorant Garamond and Manrope (open-source, SIL OFL) hosted with the site |
| `favicon/` | Browser icon and social-share image made from your supplied logo |

Page titles and descriptions for search engines are written in each HTML file's `<head>`
(search engines do not run JavaScript, so they cannot live in content.js).

## 3. Edit words
Open `content.js` and change the text between the quotation marks: brand, hero, category
descriptions, About, Why Choose Us, form messages, footer. Keep commas and quotes intact.
Hide a Why Choose Us statement with `display: false`.

## 4. Add a photograph
Static websites do **not** discover new files automatically. A new photo needs two steps:
1. Copy the image into the right folder, e.g. `Photos/Nature/misty-morning.jpg`
   (supported: .jpg .jpeg .png .webp; use simple names with no spaces).
2. Add an entry to the `photos` list at the bottom of `content.js`:
```js
{
  id: "nature-misty-morning",
  src: "Photos/Nature/misty-morning.jpg",
  category: "Nature",
  alt: "Mist over a field at sunrise.",
  title: "", caption: "",
  featured: true,
  display: true,
  order: 6
}
```
- `featured: true` puts it in "Selected work" on the home page (`featuredOrder: 1` places it first).
- `display: false` hides it everywhere without deleting it. `order` sets position inside its category.
- `alt` should plainly describe what is visible. `title`/`caption` are optional and appear only in the full-screen viewer.
- Optional speed-ups: `thumb` (a smaller WebP copy for grids) and `w`, `h`, `tw` (pixel sizes) stop the page jumping while loading.
  Without them the full image is used; it still works.
- To change the home page category picture, set `coverPhotoId` on the category. The hero photo is `hero.photoId`.

Categories with no visible photos (currently **Food** and **Anniversaries**) are hidden automatically.
They appear again as soon as you add photos to those folders and register them.

## 5. Testimonials
Only add real, approved words. In `content.js`, inside `testimonials.items`, add:
```js
{ id: "review-005", text: "Exact approved words", name: "Name (with permission)", category: "Wedding", display: true, featured: true }
```
- `display: true` → appears on `testimonials.html` (the page always shows every approved item).
- `display: true` **and** `featured: true` → also eligible for the home page section. Each time the home page loads, 1 or 2 different featured testimonials are picked at random.
- Leave `name` out and the card says "Client Feedback" (`testimonials.defaultAttribution`). Blank lines (`\n\n`) in `text` become paragraphs.
- The "Testimonials" menu and footer link appears only when at least one approved item exists.

## 6. Social links and contact details
`social.instagram` / `social.facebook`: paste full URLs. Empty ones are not shown.
In the `contact` section of `content.js`, set your real details (anything left `""` is simply not shown):
- `whatsapp`: business WhatsApp number with country code, e.g. `"+1 555 123 4567"`. Spaces, brackets and `+` are cleaned up automatically and the link becomes `https://wa.me/15551234567?text=...` (message set in `whatsappMessage`). The header "Book a Session" button opens WhatsApp once this is set; until then it goes to the contact form.
- `phone`: number for the "Call Helan" link (`tel:`).
- `email`: public address; shown as text and as the "Email Helan" link (`mailto:`).
These appear in the header button, the footer, and under the contact heading on the home page.

## 7. Contact form (needs your action)
The form uses FormSubmit (free, works on static hosting). It **cannot send until you set it up**:
1. Put your email in `form.recipient` in `content.js`.
2. Publish the site, then submit the form once from the live site.
3. FormSubmit emails you an activation link. Click it.
4. Optional: FormSubmit then gives you a private code; put that code in `form.recipient` instead of your email so your address is not visible in the page source.
Until `form.recipient` is filled in, the form says honestly that it is not connected. Success is shown only when FormSubmit confirms.
**Test honestly:** after activation, send yourself a message from the live site and check your inbox (and spam).

## 8. Publish
Upload the whole folder to any static host (GitHub Pages, Netlify, Cloudflare Pages, or ordinary web hosting). Needs an account with the host; no build step. After publishing, change the `og:image` address in the `<head>` of each HTML file to the full web address (e.g. `https://your-site.com/favicon/og-image.jpg`) so link previews show the image.

## 9. Notes
- Photos are copies; your originals are untouched. `Photos/_unassigned/` holds one product photo that did not fit an approved category (it is not shown).
- Small text uses slightly darker versions of the stone and taupe colours so it stays readable (WCAG AA).
- Videos supplied in the archive are not used on the site.
