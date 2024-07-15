import { PlaywrightTestConfig, devices } from '@playwright/test';

const config: PlaywrightTestConfig = {
    reporter: [
        ['list'],
        ['html', { outputFolder: 'playwright-report', open: 'never' }],
        ['junit', { outputFile: 'test-results/test-results.xml' }],
    ],
    workers: process.env.CI ? 1 : undefined,
    testMatch: /.*\.spec\.ts/,
    fullyParallel: true,

    /* Maximum time one test can run for. */
    timeout: 2 * 60 * 1000,
    expect: {

        /* Maximum time expect() should wait for the condition to be met. */
        timeout: 30_000
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
};

export default config;