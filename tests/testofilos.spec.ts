import { test, expect } from '@playwright/test';
import { TestofilosPage } from '../pages/TestofilosPage';

test.describe('@smoke @e2e Philosophy of Testing - Language & Core Flow', () => {
  let testofilos: TestofilosPage;

  test.beforeEach(async ({ page }) => {
    testofilos = new TestofilosPage(page);
    await testofilos.goto();
  });

  test('should load landing page in Polish by default', async ({ page }) => {
    await expect(page).toHaveTitle('Filozofia Testowania');
    await expect(testofilos.mainTitle).toContainText('Filozofia');
    await expect(testofilos.mainTitle).toContainText('Testowania');
    await expect(testofilos.mainSubtitle).toHaveText('Próba naukowego podejścia do umiejętności testowania oprogramowania.');
    const subtitleLineCount = await testofilos.mainSubtitle.evaluate(el => {
      const lineHeight = parseFloat(window.getComputedStyle(el).lineHeight);
      return Math.round(el.clientHeight / lineHeight);
    });
    expect(subtitleLineCount).toBe(1);

    await expect(testofilos.plBtn).toHaveClass(/active/);
    await expect(testofilos.enBtn).not.toHaveClass(/active/);
    await expect(testofilos.plContent).toBeVisible();
    await expect(testofilos.enContent).toBeHidden();
  });

  test('should display frozen header sticky to the top and freeze sidebar below it without occlusion', async ({ page }) => {
    await expect(testofilos.frozenHeader).toBeVisible();
    const position = await testofilos.frozenHeader.evaluate(el => window.getComputedStyle(el).position);
    expect(position).toBe('sticky');

    // Scroll down 1000px and verify sidebar (TOC) remains frozen and fully visible below frozen header
    await page.evaluate(() => window.scrollTo({ top: 1000, behavior: 'instant' }));

    const { headerBottom, sidebarTop, tocLabelTop, firstItemTop } = await page.evaluate(() => {
      const header = document.querySelector('.frozen-header-wrapper')!;
      const sidebar = document.querySelector('#pl-content .sidebar')!;
      const tocLabel = document.querySelector('#pl-content .toc-label')!;
      const firstItem = document.querySelector('#pl-content .toc-list li:first-child')!;
      return {
        headerBottom: header.getBoundingClientRect().bottom,
        sidebarTop: sidebar.getBoundingClientRect().top,
        tocLabelTop: tocLabel.getBoundingClientRect().top,
        firstItemTop: firstItem.getBoundingClientRect().top
      };
    });

    // Ensure sidebar top, Spis treści label and 01 item never slip behind frozen header
    expect(sidebarTop).toBeGreaterThanOrEqual(headerBottom);
    expect(tocLabelTop).toBeGreaterThanOrEqual(headerBottom);
    expect(firstItemTop).toBeGreaterThan(headerBottom);
  });

  test('should scroll to section with proper offset when clicking TOC item', async ({ page }) => {
    await page.locator('#pl-content .toc-list a[href="#pl-intro"]').click();
    await page.waitForTimeout(300);

    const { headerBottom, sectionTop } = await page.evaluate(() => {
      const header = document.querySelector('.frozen-header-wrapper')!;
      const section = document.querySelector('#pl-intro')!;
      return {
        headerBottom: header.getBoundingClientRect().bottom,
        sectionTop: section.getBoundingClientRect().top
      };
    });

    expect(sectionTop).toBeGreaterThanOrEqual(headerBottom);
  });

  test('should display HOME | CONTACT navigation in the top row and navigate correctly', async () => {
    await expect(testofilos.homeNavBtn).toBeVisible();
    await expect(testofilos.homeNavBtn).toHaveText('HOME');
    await expect(testofilos.contactNavBtn).toBeVisible();
    await expect(testofilos.contactNavBtn).toHaveText('CONTACT');
    await expect(testofilos.homeNavBtn).toHaveClass(/active/);

    // Switch to Contact
    await testofilos.switchToContact();
    await expect(testofilos.contactContent).toBeVisible();
    await expect(testofilos.plContent).toBeHidden();
    await expect(testofilos.contactNavBtn).toHaveClass(/active/);
    await expect(testofilos.homeNavBtn).not.toHaveClass(/active/);

    // Click HOME to return to title page / main landing
    await testofilos.switchToHome();
    await expect(testofilos.plContent).toBeVisible();
    await expect(testofilos.contactContent).toBeHidden();
    await expect(testofilos.homeNavBtn).toHaveClass(/active/);
    await expect(testofilos.contactNavBtn).not.toHaveClass(/active/);
  });

  test('should display exactly two publication tabs', async () => {
    await expect(testofilos.partTabs).toHaveCount(2);
    await expect(testofilos.part1Btn).toBeVisible();
    await expect(testofilos.part2Btn).toBeVisible();
    await expect(testofilos.part1Btn).toHaveText('Filozofia testowania · Część pierwsza');
    await expect(testofilos.part2Btn).toHaveText('Filozofia testowania · Część druga');
  });

  test('should toggle between Part One and Part Two tabs', async () => {
    await expect(testofilos.part1Btn).toHaveText('Filozofia testowania · Część pierwsza');
    await expect(testofilos.part2Btn).toHaveText('Filozofia testowania · Część druga');
    await expect(testofilos.part1Btn).toHaveClass(/active/);

    // Switch to Part 2
    await testofilos.switchToPart(2);
    await expect(testofilos.part2Title).toHaveText('Filozofia testowania · Część druga');
    await expect(testofilos.part2Desc).toContainText('Część druga jest w przygotowaniu');

    // Switch back to Part 1
    await testofilos.switchToPart(1);
    await expect(testofilos.plContent).toBeVisible();
    await expect(testofilos.part2Content).toBeHidden();
  });

  test('should switch language to English (EN)', async ({ page }) => {
    await testofilos.switchToEnglish();

    await expect(page).toHaveTitle('Philosophy of Testing');
    await expect(testofilos.mainTitle).toContainText('Philosophy');
    await expect(testofilos.mainTitle).toContainText('of Testing');
    await expect(testofilos.mainSubtitle).toHaveText('A scientific approach to the craft of software testing.');

    await expect(testofilos.enBtn).toHaveClass(/active/);
    await expect(testofilos.plBtn).not.toHaveClass(/active/);
    await expect(testofilos.enContent).toBeVisible();
    await expect(testofilos.plContent).toBeHidden();

    // Verify tabs translate to English
    await expect(testofilos.part1Btn).toHaveText('Philosophy of Testing · Part One');
    await expect(testofilos.part2Btn).toHaveText('Philosophy of Testing · Part Two');

    // Verify Contact button text
    await expect(testofilos.contactNavBtn).toHaveText('CONTACT');
  });

  test('should allow switching back to Polish (PL)', async ({ page }) => {
    await testofilos.switchToEnglish();
    await testofilos.switchToPolish();

    await expect(page).toHaveTitle('Filozofia Testowania');
    await expect(testofilos.plContent).toBeVisible();
    await expect(testofilos.enContent).toBeHidden();
  });

  test('should display findings / ustalenia in Polish version', async () => {
    await expect(testofilos.plLaws).toBeVisible();
    await expect(testofilos.plLaws).toContainText('Ustalenia');
  });

  test('should contain valid mailto contact link and footer', async () => {
    await expect(testofilos.contactEmail.first()).toHaveAttribute('href', 'mailto:pawel.zygler@gmail.com');
    await expect(testofilos.footer).toContainText('2026');
    await expect(testofilos.footer).toContainText('Filozofia Testowania');
  });

  test('should activate Modern UI experiment-one with enhanced readability when navigating to #experiment-one', async ({ page }) => {
    // Normal landing should NOT have experiment mode active
    await expect(page.locator('#experiment-bar')).toBeHidden();
    const defaultTheme = await page.locator('html').getAttribute('data-theme');
    expect(defaultTheme).toBeNull();

    // Navigate to #experiment-one
    await page.goto('/#experiment-one');
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'experiment-one');
    await expect(page.locator('#experiment-bar')).toBeVisible();

    // Verify enhanced readability colors
    const colors = await page.evaluate(() => {
      const s = getComputedStyle(document.documentElement);
      return {
        bg: s.getPropertyValue('--bg').trim(),
        textSecondary: s.getPropertyValue('--text-secondary').trim(),
        accent: s.getPropertyValue('--accent').trim()
      };
    });
    expect(colors.bg).toBe('#fbfaf8');
    expect(colors.textSecondary).toBe('#334155');
    expect(colors.accent).toBe('#4f46e5');

    // Switch to dark mode
    await page.locator('#experiment-bar button[data-mode="dark"]').click();
    await expect(page.locator('html')).toHaveAttribute('data-mode', 'dark');
    const darkBg = await page.evaluate(() => getComputedStyle(document.documentElement).getPropertyValue('--bg').trim());
    expect(darkBg).toBe('#0b0f17');

    // Switch to sepia mode
    await page.locator('#experiment-bar button[data-mode="sepia"]').click();
    await expect(page.locator('html')).toHaveAttribute('data-mode', 'sepia');
    const sepiaBg = await page.evaluate(() => getComputedStyle(document.documentElement).getPropertyValue('--bg').trim());
    expect(sepiaBg).toBe('#f6f1e8');

    // Switch back to light
    await page.locator('#experiment-bar button[data-mode="light"]').click();
    await expect(page.locator('html')).toHaveAttribute('data-mode', 'light');

    // Exit experiment cleanly
    await page.locator('#exp-exit-btn').click();
    await expect(page.locator('#experiment-bar')).toBeHidden();
    const afterExitTheme = await page.locator('html').getAttribute('data-theme');
    expect(afterExitTheme).toBeNull();
  });
});
