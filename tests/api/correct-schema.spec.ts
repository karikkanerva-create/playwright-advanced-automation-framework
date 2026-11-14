import { test, expect } from '@playwright/test';
import Ajv from 'ajv';

import { userListSchema }
  from '../../api/schemas/UserListSchema';

test(
  'validate reqres response schema',
  async ({ playwright }) => {
    const apiKey = process.env.REQRES_API_KEY;
    if (!apiKey) {
      throw new Error('REQRES_API_KEY must be set to run the ReqRes API test.');
    }

    const reqresRequest = await playwright.request.newContext({
      extraHTTPHeaders: {
        'x-api-key': apiKey,
      },
    });

    try {
      const response = await reqresRequest.get(
        'https://reqres.in/api/users?page=2',
      );
      expect(response.status()).toBe(200);

      const responseBody = await response.json();
      const ajv = new Ajv();
      const validate = ajv.compile(userListSchema);

      expect(validate(responseBody)).toBeTruthy();
    } finally {
      await reqresRequest.dispose();
    }
  }
);