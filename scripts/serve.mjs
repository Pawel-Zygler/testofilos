// Minimal static server for _site/ used by Playwright. It mimics Cloudflare Pages:
// applies rules from _site/_headers (exact paths and trailing "/*" wildcards)
// and serves 404.html with status 404 for missing paths.
import { createServer } from 'node:http';
import { existsSync, readFileSync, statSync } from 'node:fs';
import { extname, join, normalize } from 'node:path';

const root = join(process.cwd(), '_site');
const port = Number(process.env.PORT || 8080);

const types = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.woff2': 'font/woff2',
  '.txt': 'text/plain; charset=utf-8',
};

function parseHeaders() {
  const file = join(root, '_headers');
  if (!existsSync(file)) return [];
  const rules = [];
  let current = null;
  for (const line of readFileSync(file, 'utf8').split('\n')) {
    if (!line.trim() || line.trim().startsWith('#')) continue;
    if (!/^\s/.test(line)) {
      current = { pattern: line.trim(), headers: {} };
      rules.push(current);
    } else if (current) {
      const i = line.indexOf(':');
      current.headers[line.slice(0, i).trim()] = line.slice(i + 1).trim();
    }
  }
  return rules;
}

const rules = parseHeaders();

function headersFor(path) {
  const result = {};
  for (const { pattern, headers } of rules) {
    const match = pattern.endsWith('/*') ? path.startsWith(pattern.slice(0, -1)) : path === pattern;
    if (match) Object.assign(result, headers);
  }
  return result;
}

createServer((req, res) => {
  const urlPath = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
  let file = normalize(join(root, urlPath));
  if (!file.startsWith(root)) file = root;
  if (existsSync(file) && statSync(file).isDirectory()) file = join(file, 'index.html');

  let status = 200;
  if (!existsSync(file) || file.endsWith('_headers')) {
    status = 404;
    file = join(root, '404.html');
  }

  res.writeHead(status, {
    'Content-Type': types[extname(file)] || 'application/octet-stream',
    ...headersFor(urlPath),
  });
  res.end(readFileSync(file));
}).listen(port, () => console.log(`Serving _site/ on http://localhost:${port}`));
