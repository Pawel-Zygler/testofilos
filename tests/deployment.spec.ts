import { test, expect } from '@playwright/test';

// Checks that run against the built site: locally via scripts/serve.mjs (which applies
// _site/_headers like Cloudflare Pages) and, after every deploy, against the live URL.
test.describe('@smoke @deploy Philosophy of Testing - Deployment & Security Headers', () => {
  test('should serve security headers on the landing page', async ({ request }) => {
    const response = await request.get('/');
    expect(response.status()).toBe(200);

    const headers = response.headers();
    expect(headers['content-security-policy']).toContain("default-src 'none'");
    expect(headers['content-security-policy']).toContain("frame-ancestors 'none'");
    expect(headers['x-content-type-options']).toBe('nosniff');
    expect(headers['x-frame-options']).toBe('DENY');
    expect(headers['referrer-policy']).toBe('strict-origin-when-cross-origin');
  });

  test('should not publish repository files', async ({ request }) => {
    for (const path of ['/package.json', '/package-lock.json', '/README.md', '/tests/visual.spec.ts', '/.agents/AGENTS.md']) {
      const response = await request.get(path);
      expect(response.status(), `${path} should not be deployed`).toBe(404);
    }
  });

  test('should serve the custom 404 page for unknown paths', async ({ page }) => {
    const response = await page.goto('/this-page-does-not-exist');
    expect(response?.status()).toBe(404);
    await expect(page.locator('h1')).toHaveText('Nie znaleziono strony');
  });

  test('should load self-hosted fonts without any third-party requests or CSP violations', async ({ page, baseURL }) => {
    const origin = new URL(baseURL!).origin;
    const thirdParty: string[] = [];
    const errors: string[] = [];
    const fontFiles: string[] = [];
    page.on('request', req => {
      const url = req.url();
      if (url.startsWith('http') && !url.startsWith(origin)) thirdParty.push(url);
    });
    page.on('response', res => {
      if (res.url().endsWith('.woff2') && res.ok()) fontFiles.push(res.url());
    });
    page.on('console', msg => { if (msg.type() === 'error') errors.push(msg.text()); });

    await page.goto('/', { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    expect(fontFiles.some(url => url.startsWith(`${origin}/fonts/dm-sans-`)), 'DM Sans loaded from /fonts/').toBe(true);

    expect(thirdParty, 'No requests should leave the site origin').toEqual([]);
    expect(errors, 'No console errors (including CSP violations)').toEqual([]);
  });

  test('should expose description, canonical URL and social preview metadata', async ({ page, request }) => {
    await page.goto('/');
    await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /.+/);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', 'https://testofilos.pages.dev/');
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute('content', 'https://testofilos.pages.dev/og-image.png');

    for (const path of ['/favicon.svg', '/og-image.png']) {
      expect((await request.get(path)).status(), path).toBe(200);
    }
  });
});
