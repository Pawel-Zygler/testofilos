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

    await expect(testofilos.plBtn).toHaveClass(/active/);
    await expect(testofilos.enBtn).not.toHaveClass(/active/);
    await expect(testofilos.plContent).toBeVisible();
    await expect(testofilos.enContent).toBeHidden();
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
    await expect(testofilos.footer).toContainText('Filozofia Testowania');
  });
});
