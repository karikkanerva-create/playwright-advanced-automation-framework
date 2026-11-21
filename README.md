# Playwright Advanced Automation Framework

This project demonstrates an advanced Playwright and TypeScript automation framework for testing a web application, managing authentication state, and validating API responses. The suite combines end-to-end UI testing, reusable fixtures, page object model patterns, mock-based API testing, and data-driven testing. Python utilities generate JSON test datasets and mock API responses that Playwright tests can reuse.

## Technologies

- Playwright Test
- Docker
- TypeScript
- Node.js
- JSON test data
- Page Object Model (POM)
- Reusable Playwright fixtures
- Ajv schema validation
- Cross-browser testing
- API mocking and network interception
- Python utilities

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
│       ├── generated-users.json
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
│       ├── generated-users.spec.ts
│       ├── invalid-schema.spec.ts
│       └── server-error.spec.ts
├── tools/
│   └── generate_mock_users.py
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
- Mock empty, delayed, invalid, server-error, and Python-generated user responses to test resilience and data-driven behavior
- Verify UI elements and application state using Playwright assertions

The test suite runs across Chromium, Firefox, and WebKit.

## Mocking and API Validation

This project includes dedicated mocking scenarios to demonstrate how Playwright can intercept and control network traffic during test execution. These tests validate different response conditions without relying on a live backend.

### Included mocking cases

- Empty users response
  - Verifies that the application handles valid empty datasets correctly.
- Generated users response
  - Demonstrates Python-generated mock data used with Playwright network interception.
- Delayed response
  - Simulates network latency and validates timing-sensitive behavior.
- Invalid schema response
  - Confirms that a broken response payload is rejected by schema validation.
- Server error response
  - Tests handling of HTTP 500 responses and error payloads.

These tests are implemented using `page.route()` and `route.fulfill()`, which allows the mock payloads to be returned exactly as needed for the scenario.

## Python Utilities

- Automated test data generation
- JSON dataset creation
- Mock API response generation

The Python utility at `tools/generate_mock_users.py` creates a generated users
JSON dataset at `data/mocks/generated-users.json`. The dataset can be used
directly with Playwright mocking.

Python-generated test data is automatically created if the dataset does not exist before test execution.

Run the generator from the project root:

```bash
python tools/generate_mock_users.py
```

## Continuous Integration

GitHub Actions runs the Playwright test suite on pushes and pull requests targeting `main` or `master`. The workflow can also be started manually from the **Actions** tab using **Run workflow**.

The workflow installs Node.js dependencies and the Playwright browsers, runs the tests in headless mode, and uploads the HTML report and test results as a downloadable artifact, including when a test fails. The SauceDemo URLs are supplied by the workflow, so no local `config/dev.env` file or GitHub secret is required for these tests.

## Skills Demonstrated

- Playwright Test
- Docker containerization and test execution
- TypeScript
- End-to-end UI test automation
- API testing and JSON Schema Validation (AJV)
- Mocking and network interception with `page.route()`
- Page Object Model (POM)
- Reusable Playwright fixtures
- Storage State Authentication
- API Contract Testing
- Github CI Actions
- Cross-browser testing
- Test data management with JSON
- Troubleshooting API and UI failures in automated tests
- Automated Test Data Generation using Python

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

## Run Tests with Docker

The Docker image uses Playwright `1.64.1`. Create `config/dev.env` as described
above before running the container. Build the image from the project root:

```bash
docker build -t playwright-advanced-automation-framework .
```

Run the tests and keep the HTML report and test results in the project folders:

```bash
docker run --rm --env-file config/dev.env \
  -v "${PWD}/playwright-report:/app/playwright-report" \
  -v "${PWD}/test-results:/app/test-results" \
  playwright-advanced-automation-framework
```

The authentication setup test creates `auth/storageState.json` in the
container before the browser tests run. The file is excluded from the Docker
build context, so a pre-existing local storage state is not required.

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
