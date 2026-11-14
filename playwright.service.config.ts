import { DefaultAzureCredential } from '@azure/identity';
import { createAzurePlaywrightConfig, ServiceOS } from '@azure/playwright';
import { defineConfig } from '@playwright/test';
import config from './playwright.config.ts';

if (!process.env.PLAYWRIGHT_SERVICE_URL) {
  throw new Error(
    'Set PLAYWRIGHT_SERVICE_URL to your Azure Playwright Workspaces browser endpoint.',
  );
}

export default defineConfig(
  config,
  createAzurePlaywrightConfig(config, {
    os: ServiceOS.LINUX,
    credential: new DefaultAzureCredential(),
  }),
  {
    outputDir: 'test-results/azure',
    reporter: [['html', { outputFolder: 'playwright-report/azure' }]],
  },
);
