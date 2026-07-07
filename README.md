# chrisjohnson89.github.io

Personal site for Christopher Johnson: Linux support lead, reliability
engineer, and tool builder.

Plain static HTML and CSS, no build step, no JavaScript, no trackers.
Served by GitHub Pages from `main`.

- `index.html` / `styles.css`: the site
- `404.html`: standalone error page (inline styles, works from any path)
- `og-image.png`: social share card, 1200x630
- `robots.txt` / `sitemap.xml`: crawler plumbing

## Run locally

```sh
python3 -m http.server 4173
```

Open `http://localhost:4173`.
