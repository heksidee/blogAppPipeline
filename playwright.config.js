// @ts-check
import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

// Lataa .env.test tiedoston, jotta TEST_MONGODB_URI löytyy
dotenv.config({ path: '.env' });

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './playwright-tests',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:5173',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    /*{
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },*/
  ],
  webServer: [
    /*{
      command: 'npm run start:test --prefix backend',
      url: 'http://localhost:3003',
      env: {
        NODE_ENV: 'test',
        TEST_MONGODB_URI: process.env.TEST_MONGODB_URI ?? '',
        SECRET: process.env.SECRET ?? '',
      },
      reuseExistingServer: !process.env.CI,
      timeout: 120 * 1000,
    },*/
    {
      command: 'npm run dev --prefix frontend',
      url: 'http://localhost:5173',
      reuseExistingServer: !process.env.CI,
      timeout: 60 * 1000,
    },
  ],
});
