# 🧭 Project Roadmap

This project is developed step by step to demonstrate the core skills required for an Automation Tester position.

The project includes five main stages:

### 1. Playwright API Testing

Use Playwright with TypeScript to perform automated API testing for a [Spring Boot backend](https://github.com/Thanh-Binhhh/Spring-Commerce).

Implemented tasks:

- Set up Playwright and configure the backend `baseURL`
- Create positive and negative API test cases
- Validate HTTP status codes
- Validate response structure and data types
- Test query parameters

[Detailed information](#playwright-api-testing-for-bonsai-shop)

### 2. Playwright E2E Testing

Use Playwright to automate browser interactions with the [Spring Boot backend](https://github.com/Thanh-Binhhh/Spring-Commerce).

Implemented tasks:

- Open the Products page
- Verify that products are rendered on the UI
- Validate product name and price

[Detailed information](#-playwright-e2e-testing)

### 3. Git & GitHub

Manage the automation project using Git and GitHub.

Planned tasks:

- Create and manage Git branches
- Commit automation test changes
- Push source code to GitHub
- Maintain a clean repository structure
- Use `.gitignore` for generated files

### 4. GitHub Actions CI/CD

Integrate Playwright tests with GitHub Actions.

Planned tasks:

- Create GitHub Actions workflow
- Automatically install dependencies
- Install Playwright browsers
- Run automated tests on every push
- Upload Playwright test reports as artifacts

### 5. Playwright HTML Report

Generate and review Playwright HTML test reports.

Implemented / planned tasks:

- Generate HTML reports after test execution
- Review passed and failed test cases
- View execution duration
- Debug failed tests using report information

---

## 🌷 Playwright API Testing for Bonsai Shop

Backend repository: [Spring-Commerce](https://github.com/Thanh-Binhhh/Spring-Commerce)

### Project structure

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

### Getting started

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

### Creating the Playwright Test Project from scratch

Start from the root directory of the Spring Boot project.

```
mkdir playwright-tests
cd playwright-tests
npm init -y
npm install -D @playwright/test
```

Then create the following structure

```
playwright-tests/
│   ├── tests/api/
│   ├── package.json
│   └── playwright.config.ts
```

---

## E2E

```
npx playwright install chromium
npx playwright test tests/e2e/plants.spec.js --headed

```

npx playwright test --project=e2e --reporter=html
npx playwright show-report
