const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ['list'],
    ['html', { open: 'never', outputFolder: 'playwright-report' }],
    ['json', { outputFile: 'test-results/results.json' }],
    ...(process.env.CI ? [['github']] : [])
  ],
  // Locally and in CI the tests run against the built _site/ served with the same
  // headers as Cloudflare Pages. Set BASE_URL to test a deployed site instead.
  webServer: process.env.BASE_URL ? undefined : {
    command: 'node scripts/build.mjs && node scripts/serve.mjs',
    port: 8080,
    reuseExistingServer: !process.env.CI,
    timeout: 20000,
  },
  use: {
    baseURL: process.env.BASE_URL || 'http://localhost:8080',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
