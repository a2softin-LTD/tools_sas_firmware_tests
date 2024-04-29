import { defineConfig } from "playwright/test";

export default defineConfig({
  workers: process.env.CI ? 1 : undefined,
  testMatch: /.*\.spec\.ts/,
  fullyParallel: true,
  timeout: 2*60*1000,
  expect: {
    timeout: 30_000
  },
  globalSetup: "./globalSetup.js",
  outputDir: "test-results",
  use: {
    headless: true,
    trace: "retain-on-failure",
    screenshot: "only-on-failure"
  }
});