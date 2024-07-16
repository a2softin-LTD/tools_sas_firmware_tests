import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
    reporter: [
        ['list'],
        ['html', { outputFolder: 'playwright-report', open: 'never' }],
        ['junit', { outputFile: 'test-results/test-results.xml' }],
    ],
    workers: 1,
    testMatch: /.*\.spec\.ts/,
    fullyParallel: true,

    /* Maximum time one test can run for. */
    timeout: 20 * 60 * 1000,
    expect: {
        /* Maximum time expect() should wait for the condition to be met. */
        timeout: 20 * 60 * 1000
    },

    /* Folder for test artifacts such as screenshots, videos, traces, etc. */
    outputDir: './test-results/',

    /* Retry on CI only */
    retries: process.env.CI ? 2 : 0,

    globalSetup: "./globalSetup.js",
    use: {
        headless: true,
        trace: "retain-on-failure",
        screenshot: "only-on-failure"
    }
});
