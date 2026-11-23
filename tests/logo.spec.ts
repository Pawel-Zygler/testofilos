import { test, expect } from '@playwright/test';
import { TestofilosPage } from '../pages/TestofilosPage';

// Visual regression for the "true ≠ false" logo: on the landing page and as the icon in the
// browser tab. Both are pure vector shapes (the logo's text is converted to outlines), so the
// snapshots do not depend on the fonts installed on the machine.
test.describe('@regression @visual Philosophy of Testing - Logo & Browser Tab Icon', () => {
  let testofilos: TestofilosPage;

  test.beforeEach(async ({ page }) => {
    testofilos = new TestofilosPage(page);
  });

  test('should show the logo left of the title and subtitle on the landing page', async () => {
    await testofilos.goto();
    const logo = testofilos.siteLogo;

    await expect(logo).toBeVisible();
    await expect(logo).toHaveAttribute('src', 'logo.svg');
    // Decorative: the H1 next to it already names the site
    await expect(logo).toHaveAttribute('alt', '');
    expect(await logo.evaluate((img: HTMLImageElement) => img.complete && img.naturalWidth > 0), 'logo.svg loaded').toBe(true);

    const logoBox = (await logo.boundingBox())!;
    const titleBox = (await testofilos.mainTitle.boundingBox())!;
    const subtitleBox = (await testofilos.mainSubtitle.boundingBox())!;
    expect(Math.round(logoBox.width)).toBe(84);
    expect(Math.round(logoBox.height)).toBe(84);

    // Left of both text lines and spanning them vertically
    expect(logoBox.x + logoBox.width).toBeLessThan(titleBox.x);
    expect(logoBox.x + logoBox.width).toBeLessThan(subtitleBox.x);
    expect(logoBox.y).toBeLessThan(titleBox.y + titleBox.height);
    expect(logoBox.y + logoBox.height).toBeGreaterThan(subtitleBox.y);

    await expect(logo).toHaveScreenshot('logo-landing-desktop.png', { maxDiffPixelRatio: 0.02 });
  });

  test('should show a smaller logo next to the title on a phone', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await testofilos.goto();
    const logo = testofilos.siteLogo;
    await expect(logo).toBeVisible();

    const logoBox = (await logo.boundingBox())!;
    const titleBox = (await testofilos.mainTitle.boundingBox())!;
    const subtitleBox = (await testofilos.mainSubtitle.boundingBox())!;
    expect(Math.round(logoBox.width)).toBe(56);
    expect(Math.round(logoBox.height)).toBe(56);

    // Same row as the title; the subtitle starts below the logo at full width
    const logoMiddle = logoBox.y + logoBox.height / 2;
    expect(logoMiddle).toBeGreaterThan(titleBox.y);
    expect(logoMiddle).toBeLessThan(titleBox.y + titleBox.height);
    expect(titleBox.x).toBeGreaterThan(logoBox.x + logoBox.width);
    expect(subtitleBox.y).toBeGreaterThanOrEqual(logoBox.y + logoBox.height);
    expect(Math.round(subtitleBox.x)).toBe(Math.round(logoBox.x));

    await expect(logo).toHaveScreenshot('logo-landing-mobile.png', { maxDiffPixelRatio: 0.02 });
  });

  test('should use the ≠ icon from the logo in the browser tab', async ({ page, request }) => {
    await testofilos.goto();
    await expect(testofilos.favicon).toHaveAttribute('href', 'favicon.svg');
    await expect(testofilos.favicon).toHaveAttribute('type', 'image/svg+xml');

    const response = await request.get('/favicon.svg');
    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toContain('image/svg+xml');

    // A headless browser draws no tab strip, so render the icon at the sizes a tab uses:
    // 16 px on standard displays and 32 px on high-density ones.
    for (const size of [16, 32]) {
      await page.setViewportSize({ width: size, height: size });
      await page.goto('/favicon.svg');
      await expect(page).toHaveScreenshot(`favicon-tab-${size}px.png`, { maxDiffPixelRatio: 0.02 });
    }
  });
});
