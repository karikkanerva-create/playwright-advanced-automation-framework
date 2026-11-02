import { test, expect } from '@playwright/test';
import serverError from '../../data/mocks/users-server-error.json';

test('simulate 500 error response', async ({ page }) => {

  await page.route(
    'https://reqres.in/api/users*',
    async route => {

      await route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify(serverError)
      });

    }
  );

  const response = await page.evaluate(async () => {

    const response =
      await fetch(
        'https://reqres.in/api/users?page=2'
      );

    return {
      status: response.status,
      body: await response.json()
    };

  });

  expect(response.status).toBe(500);

  expect(response.body.serverError)
    .toBe('Internal Server Error');
  
  //verify that the response comes from the mocked data and not from the actual API
  expect(response.body.myTestValue).toBe('Kari'); 

});