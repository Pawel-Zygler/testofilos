import { Page, Locator, expect } from '@playwright/test';

export class TestofilosPage {
  readonly page: Page;
  readonly mainTitle: Locator;
  readonly mainSubtitle: Locator;
  readonly plBtn: Locator;
  readonly enBtn: Locator;
  readonly uaBtn: Locator;
  readonly partsNav: Locator;
  readonly partTabs: Locator;
  readonly part1Btn: Locator;
  readonly part2Btn: Locator;
  readonly plContent: Locator;
  readonly enContent: Locator;
  readonly uaContent: Locator;
  readonly part2Content: Locator;
  readonly part2Title: Locator;
  readonly part2Desc: Locator;
  readonly plToc: Locator;
  readonly enToc: Locator;
  readonly uaToc: Locator;
  readonly plLaws: Locator;
  readonly enLaws: Locator;
  readonly uaLaws: Locator;
  readonly contactEmail: Locator;
  readonly footer: Locator;
  readonly footerText: Locator;

  constructor(page: Page) {
    this.page = page;
    this.mainTitle = page.locator('[data-testid="main-title"], #main-title');
    this.mainSubtitle = page.locator('[data-testid="main-subtitle"], #main-subtitle');
    this.plBtn = page.locator('[data-testid="lang-switch-pl"], #pl-btn');
    this.enBtn = page.locator('[data-testid="lang-switch-en"], #en-btn');
    this.uaBtn = page.locator('[data-testid="lang-switch-ua"], #ua-btn');

    // Parts tabs
    this.partsNav = page.locator('[data-testid="parts-nav"], .parts-nav');
    this.partTabs = page.locator('[data-testid="parts-nav"] button, .parts-nav .part-tab');
    this.part1Btn = page.locator('[data-testid="tab-part-1"], #part1-btn');
    this.part2Btn = page.locator('[data-testid="tab-part-2"], #part2-btn');

    // Content containers
    this.plContent = page.locator('[data-testid="content-pl"], #pl-content');
    this.enContent = page.locator('[data-testid="content-en"], #en-content');
    this.uaContent = page.locator('[data-testid="content-ua"], #ua-content');
    this.part2Content = page.locator('[data-testid="content-part2"], #part2-content');
    this.part2Title = page.locator('#part2-title');
    this.part2Desc = page.locator('#part2-desc');

    this.plToc = page.locator('[data-testid="toc-pl"], nav.toc[aria-label="Spis treści"]');
    this.enToc = page.locator('[data-testid="toc-en"], nav.toc[aria-label="Table of Contents"]');
    this.uaToc = page.locator('[data-testid="toc-ua"], nav.toc[aria-label="Зміст"]');
    this.plLaws = page.locator('[data-testid="section-pl-laws"], #pl-laws');
    this.enLaws = page.locator('[data-testid="section-en-laws"], #en-laws');
    this.uaLaws = page.locator('[data-testid="section-ua-laws"], #ua-laws');
    this.contactEmail = page.locator('[data-testid="contact-email"], a[href^="mailto:"]');
    this.footer = page.locator('[data-testid="site-footer"], .site-footer');
    this.footerText = page.locator('[data-testid="footer-text"], #footer-text');
  }

  async goto() {
    await this.page.goto('/', { waitUntil: 'domcontentloaded' });
  }

  async switchToEnglish() {
    await this.enBtn.click();
    await expect(this.enBtn).toHaveClass(/active/);
    await expect(this.enContent).not.toHaveClass(/hidden/);
    await expect(this.plContent).toHaveClass(/hidden/);
  }

  async switchToPolish() {
    await this.plBtn.click();
    await expect(this.plBtn).toHaveClass(/active/);
    await expect(this.plContent).not.toHaveClass(/hidden/);
    await expect(this.enContent).toHaveClass(/hidden/);
  }

  async switchToUkrainian() {
    await this.uaBtn.click();
    await expect(this.uaBtn).toHaveClass(/active/);
    await expect(this.uaContent).not.toHaveClass(/hidden/);
    await expect(this.plContent).toHaveClass(/hidden/);
  }

  async switchToPart(part: 1 | 2) {
    if (part === 1) {
      await this.part1Btn.click();
      await expect(this.part1Btn).toHaveClass(/active/);
      await expect(this.part2Content).toHaveClass(/hidden/);
    } else {
      await this.part2Btn.click();
      await expect(this.part2Btn).toHaveClass(/active/);
      await expect(this.part2Content).not.toHaveClass(/hidden/);
    }
  }

  async getTocItems(lang: 'pl' | 'en' | 'ua'): Promise<string[]> {
    const toc = lang === 'pl' ? this.plToc : (lang === 'en' ? this.enToc : this.uaToc);
    return await toc.locator('a').allInnerTexts();
  }
}
