import { test, expect } from '@playwright/test';
import Ajv from 'ajv';

import invalidSchemaResponse
  from '../../data/mocks/users-invalid-schema.json';

import { userListSchema }
  from '../../api/schemas/UserListSchema';

test('mock invalid schema response', async ({ page }) => {

  await page.route(
    'https://reqres.in/api/users*',
    async route => {

      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(
          invalidSchemaResponse
        )
      });

    }
  );

  const response = await page.evaluate(async () => {

    const response =
      await fetch(
        'https://reqres.in/api/users?page=2'
      );

    //Response comes from the mocked data and not from the actual API
    //return await response.json();
    return {
      body: await response.json()
    };
  });

  //verify that the response comes from the mocked data and not from the actual API
  expect(response.body.myTestValue).toBe('Kari');

  const ajv = new Ajv();

  const validate =
    ajv.compile(userListSchema);

  const valid =
    validate(response.body);

  //Required per_page missing. page is not number
  expect(valid).toBeFalsy();

});