# Playwright Advanced Automation Framework

This project demonstrates an advanced Playwright and TypeScript automation framework for testing a web application, managing authentication state, and validating API responses. The suite combines end-to-end UI testing, reusable fixtures, page object model patterns, and mock-based API testing to build a realistic and maintainable test environment.

## Technologies

- Playwright Test
- TypeScript
- Node.js
- JSON test data
- Page Object Model (POM)
- Reusable Playwright fixtures
- Ajv schema validation
- Cross-browser testing
- API mocking and network interception

## Project Structure

```text
playwright-advanced-automation-framework/
├── api/
│   └── schemas/
│       └── UserListSchema.ts
├── auth/
│   └── storageState.json
├── components/
│   └── HeaderComponent.ts
├── config/
│   └── dev.env
├── data/
│   ├── products.json
│   ├── users.json
│   └── mocks/
│       ├── empty-users.json
│       ├── users-delay.json
│       ├── users-invalid-schema.json
│       └── users-server-error.json
├── fixtures/
│   ├── auth.fixture.ts
│   └── test.fixture.ts
├── pages/
│   ├── CartPage.ts
│   ├── InventoryPage.ts
│   └── LoginPage.ts
├── tests/
│   ├── addproduct.spec.ts
│   ├── test.spec.ts
│   ├── api/
│   │   └── correct-schema.spec.ts
│   ├── auth/
│   │   └── auth.setup.spec.ts
│   └── mocking/
│       ├── delayed-response.spec.ts
│       ├── empty-users.spec.ts
│       ├── invalid-schema.spec.ts
│       └── server-error.spec.ts
├── utils/
│   └── dataFactory.ts
├── package.json
├── playwright.config.ts
├── playwright-report/
│   └── index.html
├── test-results/
└── README.md
```

## Test Scenarios

- Log in as the standard user using stored authentication state
- Add a product to the shopping cart and verify that it is displayed correctly
- Remove the product and verify that the cart is empty
- Validate an API response against a JSON schema with Ajv
- Mock empty, delayed, invalid, and server-error responses to test resilience
- Verify UI elements and application state using Playwright assertions

The test suite runs across Chromium, Firefox, and WebKit.

## Mocking and API Validation

This project includes dedicated mocking scenarios to demonstrate how Playwright can intercept and control network traffic during test execution. These tests validate different response conditions without relying on a live backend.

### Included mocking cases

- Empty users response
  - Verifies that the application handles valid empty datasets correctly.
- Delayed response
  - Simulates network latency and validates timing-sensitive behavior.
- Invalid schema response
  - Confirms that a broken response payload is rejected by schema validation.
- Server error response
  - Tests handling of HTTP 500 responses and error payloads.

These tests are implemented using `page.route()` and `route.fulfill()`, which allows the mock payloads to be returned exactly as needed for the scenario.

## Continuous Integration

GitHub Actions runs the Playwright test suite on pushes and pull requests targeting `main` or `master`. The workflow can also be started manually from the **Actions** tab using **Run workflow**.

The workflow installs Node.js dependencies and the Playwright browsers, runs the tests in headless mode, and uploads the HTML report and test results as a downloadable artifact, including when a test fails. The SauceDemo URLs are supplied by the workflow, so no local `config/dev.env` file or GitHub secret is required for these tests.

## Skills Demonstrated

- Playwright Test
- TypeScript
- End-to-end UI test automation
- API testing and schema validation
- Mocking and network interception
- Page Object Model (POM)
- Reusable Playwright fixtures
- Authentication state management
- Cross-browser testing
- Test data management with JSON
- Troubleshooting API and UI failures in automated tests

## Installation

```bash
npm install
npx playwright install
```

## Environment Configuration

Create a `config/dev.env` file in the project root:

```env
BASE_URL=https://www.saucedemo.com
INVENTORY_URL=https://www.saucedemo.com/inventory.html
HEADLESS=true
```

## Run All Tests

```bash
npx playwright test
```

## Run a Specific Test

```bash
npx playwright test tests/addproduct.spec.ts
```

## View Test Report

After running the tests, open the generated HTML report:

```bash
npx playwright show-report
```

## Author

Kari Kanerva<br>
Bachelor of Computer Science<br>
ISTQB Foundation Level Tester CTFL 4.0<br>
ISTQB Foundation Agile Tester<br>
email: kari.k.kanerva@gmail.com
