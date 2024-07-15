import {defineConfig} from "playwright/test";

export default defineConfig({
    reporter: [
        ['list'],
        ['html', { outputFolder: 'playwright-report', open: 'never' }],
        ['junit', { outputFile: 'test-results/test-results.xml' }],
    ],
    workers: process.env.CI ? 1 : undefined,
    //testDir: 'specs',
    testMatch: /.*\.spec\.ts/,
    fullyParallel: true,
    timeout: 20 * 60 * 1000,
    expect: {
        timeout: 30_000
    },
    globalSetup: "./globalSetup.js",
    //outputDir: "./test-results",
    use: {
        headless: true,
        trace: "retain-on-failure",
        screenshot: "only-on-failure"
    }
});