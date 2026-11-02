import { test as base, expect } from './test.fixture';

type AuthFixtures = {
  authenticatedInventory: void;
};

export const test = base.extend<AuthFixtures>({
  authenticatedInventory: async ({ loginPage, inventoryPage }, use) => {
    //await loginPage.navigate();
    //await loginPage.login();
    await inventoryPage.expectLoaded();
    await use();
  },
});

export { expect };