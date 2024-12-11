import { PlaywrightTestConfig } from '@playwright/test';

interface TestConfig extends PlaywrightTestConfig {
    loginUrl: string;
    envUrl: string;
}

const defaultConfig: PlaywrightTestConfig = {
    reporter: [
        ['list'],
        ['html', { outputFolder: 'playwright-report', open: 'never' }],
        ['junit', { outputFile: 'test-results/test-results.xml' }],
    ],
    workers: process.env.CI ? 1 : 1,
    testMatch: /.*\.spec\.ts/,
    fullyParallel: true,

    /* Maximum time one test can run for. */
    timeout: 30 * 60 * 1000,
    expect: {
        /* Maximum time expect() should wait for the condition to be met. */
        timeout: 30 * 60 * 1000
    },

    /* Folder for test artifacts such as screenshots, videos, traces, etc. */
    outputDir: './test-results/',

    /* Retry on CI only */
    retries: process.env.CI ? 0 : 0,

    globalSetup: "./globalSetup.js",
    use: {
        headless: true,
        trace: "retain-on-failure",
        screenshot: "only-on-failure",
    },
};

// set config for DEV
const devConfig: TestConfig = {
    loginUrl: 'https://dev-account.maks.systems:10001',
    envUrl: 'https://dev-discovery.maks.systems:8080'
};

// set config for QA
const qaConfig: TestConfig = {
    loginUrl: "https://qa-account.maks.systems:10001",
    envUrl: "https://qa-discovery.maks.systems:8080"
};

// set config for PROD
const prodConfig: TestConfig = {
    loginUrl: "https://prod-account.maks.systems:10001",
    envUrl: "https://prod-discovery.maks.systems:8080"
};

// get the environment type from command line. If none, set it to dev
const environment: string = process.env.TEST_ENV || 'dev';

// config object with default configuration and environment specific configuration
const config: TestConfig = {
    ...defaultConfig,
    ...(environment === 'qa' ? qaConfig : environment === 'prod' ? prodConfig : devConfig)
};

export default config;