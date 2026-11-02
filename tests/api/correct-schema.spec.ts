import { test, expect } from '@playwright/test';
import Ajv from 'ajv';

import { userListSchema }
  from '../../api/schemas/UserListSchema';

test(
  'validate reqres response schema',
  async ({ request }) => {

    const response =
      await request.get(
        'https://reqres.in/api/users?page=2'
      );

    expect(response.status()).toBe(200);

    const responseBody =
      await response.json();

    const ajv = new Ajv();

    const validate =
      ajv.compile(userListSchema);

    const valid =
      validate(responseBody);

    expect(valid).toBeTruthy();

  }
);