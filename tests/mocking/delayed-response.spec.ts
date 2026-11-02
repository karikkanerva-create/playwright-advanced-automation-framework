import { test, expect } from '@playwright/test';
import delayedUsers from '../../data/mocks/users-delay.json';

test('mock delayed api response', async ({ page }) => {

  await page.route(
    'https://reqres.in/api/users*',
    async route => {

      await new Promise(
        resolve => setTimeout(resolve, 3000)
      );

      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(delayedUsers)
      });

    }
  );

  const startTime = Date.now();

  const response = await page.evaluate(async () => {

    const response =
      await fetch(
        'https://reqres.in/api/users?page=2'
      );

    return {
      //Response comes from the mocked data and not from the actual API
      status: response.status,
      body: await response.json()
    };

  });

  const duration =
    Date.now() - startTime;

  expect(response.status).toBe(200);

  expect(response.body.data.length)
    .toBeGreaterThan(0);

  expect(duration)
    .toBeGreaterThanOrEqual(3000);
  
  //verify that the response comes from the mocked data and not from the actual API
  expect(response.body.myTestValue).toBe('Kari');

});