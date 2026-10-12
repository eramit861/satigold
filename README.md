# Sati Gold Pure Honey – Sales Page

One-page React (Vite) sales site. The build is prerendered to static HTML, so it can be hosted anywhere (Netlify, Vercel, cPanel, S3, GitHub Pages).

## Commands

```bash
npm install
npm run dev       # local development
npm run build     # production build -> dist/
npm run preview   # serve dist/ locally
npm run images -- /path/to/Sati_Gold_Brand_Assets   # regenerate optimized images
```

## Deploy (Hostinger)

`npm run deploy` builds the site and force-pushes `dist/` (including the generated `.htaccess`) to the `deploy` branch.
In hPanel → Advanced → Git, track branch `deploy` into `public_html`, then click **Pull** (or enable Auto Deployment).

## Business details

Everything lives in `src/config/site.js`: domain (`url`), enquiry email, phone/WhatsApp, address, SEO title, description and keywords.
These values feed the page, meta/Open Graph tags, JSON-LD, `robots.txt`, `sitemap.xml` and `site.webmanifest`. Rebuild after changing them.

Page copy (benefits, FAQs, pack sizes, gallery) lives in `src/data/content.js`.

## Enquiry email (FormSubmit)

"Send by Email" posts to [FormSubmit](https://formsubmit.co) – no backend needed.
The first submission sends an activation email to `contact.email`; click the link once and later enquiries are delivered.
