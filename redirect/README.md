# GitHub Pages redirect

The site is hosted on Cloudflare Pages at https://testofilos.pages.dev/.
The `redirect-github-pages` job in `.github/workflows/deploy.yml` publishes `index.html`
from this folder (also copied as `404.html`) to the old GitHub Pages address
https://pawel-zygler.github.io/testofilos/, so old links land on the new site.
