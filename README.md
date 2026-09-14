Automated testing project for the [Spring-Commerce](https://github.com/Thanh-Binhhh/Spring-Commerce) application using **Playwright**. This project was created to demonstrate practical Automation Tester skills, including:

1. API testing
2. End-to-End testing
3. Git & GitHub
4. CI/CD with GitHub Actions
5. Automated test reporting

# 🧭 Project Roadmap

### 1. API Testing

Automated API testing for the Spring Boot backend using Playwright and TypeScript.

Implemented tasks:

- Configure Playwright API testing environment
- Configure backend `baseURL`
- Create positive test scenarios
- Create negative test scenarios
- Validate HTTP status codes
- Validate JSON response structure
- Validate response data types
- Test query parameters

### 2. E2E Testing

Use Playwright to automate browser interactions.

Implemented tasks:

- Open the Products page
- Verify that products are rendered on the UI
- Validate product name and price
- Run tests using Chromium

### 3. Git & GitHub

Git and GitHub are used to manage the automation project and track source code changes.

Planned tasks:

- Commit test changes
- Push source code to GitHub
- Maintain a clean repository structure
- Configure `.gitignore`

### 4. CI/CD with GitHub Actions

Playwright tests are automatically executed using GitHub Actions.

The CI pipeline automatically:

1. Checks out the automation repository
2. Installs Node.js dependencies
3. Installs Playwright Chromium
4. Checks out the Spring Boot backend
5. Checks out the frontend source code
6. Configures Java 21
7. Starts MySQL using Docker Compose
8. Starts the Spring Boot backend
9. Starts the frontend web server
10. Runs Playwright API and E2E tests
11. Uploads the Playwright HTML report as a GitHub Actions artifact

The workflow is triggered automatically on:

```text
push → main
pull_request → main
workflow_dispatch
```

This allows automated regression testing whenever new changes are pushed to the repository.

### 5. Playwright HTML Report

Playwright HTML reports are generated after test execution.

The report can be used to:

- Review passed and failed test cases
- Check test execution details
- View error messages
- Debug failed tests

# 🛠️ Project Development Guide

### 1. API Testing

The API test suite validates REST APIs provided by the [Spring Boot backend](https://github.com/Thanh-Binhhh/Spring-Commerce).

#### Creating the Playwright Test project

```
mkdir playwright-tests
cd playwright-tests
npm init -y
npm install -D @playwright/test
```

Then create the following structure

```
playwright-tests/
│   ├── tests/api/                  // folder contains all automated API test files
│   │   ├── categories.spec.ts
│   │   └── plants.spec.ts
│   ├── package.json
│   ├── package-lock.json
│   ├── playwright.config.ts
│   └── README.md
```

#### Running API Tests

Before running Playwright tests, make sure the Spring-Commerce backend is running.

Next, navigate to the Playwright test directory and install the required dependencies

```
cd playwright-tests
npm install
```

Run all automated tests:

```
npx playwright test
```

Run a specific test file:

```
npx playwright test tests/api/categories.spec.ts
```

### 2. E2E

The E2E test suite validates the application from the user's point of view using Chromium. It verifies that the frontend can communicate correctly with the backend and display data on the user interface.

The frontend source code is located in the `front-end` branch of the Spring Commerce repository.

#### Adding E2E Tests

Add an `e2e` directory inside the `tests` folder

```
playwright-tests/
│
├── tests/
│   ├── api/
│   └── e2e/
│       └── plants.spec.ts
├── package.json
├── package-lock.json
├── playwright.config.ts
└── README.md
```

Next, install Chromium

```
npx playwright install chromium
```

#### Run the E2E test

```bash
npx playwright test tests/e2e/plants.spec.ts
```

Run the test in headed mode to see the browser while the test is running:

```
npx playwright test tests/e2e/plants.spec.ts --headed
```

### 3. Git & Github

### 4. Github Workflow

The CI environment automatically creates the complete application test environment. This allows automated regression tests to run without manually starting the application.

### 5. HTML report

Playwright provides an HTML report that shows detailed test results.

Run the tests and generate an HTML report:
```
npx playwright test --reporter=html
npx playwright show-report
```