import { test, expect } from '@playwright/test';
import emptyUsers from '../../data/mocks/empty-users.json';

test('mock empty users response', async ({ page }) => {

  await page.route(
    'https://reqres.in/api/users*',
    async route => {

      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(emptyUsers)
      });

    }
  );

  const response = await page.evaluate(async () => {

    const response =
      await fetch(
        'https://reqres.in/api/users?page=2'
      );

    //Response comes from the mocked data and not from the actual API
    return {
      status: response.status,
      body: await response.json()
    };
  });

  expect(response.status).toBe(200);

  expect(response.body.data).toHaveLength(0);

  expect(response.body.total).toBe(0);
  
  //verify that the response comes from the mocked data and not from the actual API
  expect(response.body.myTestValue).toBe('Kari');

});