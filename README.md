# 🧭 Project Roadmap

This project is developed step by step to demonstrate the core skills required for an Automation Tester position.

The project includes five main stages:

### 1. Playwright API Testing

Use Playwright with TypeScript to perform automated API testing for a [Spring Boot backend](https://github.com/Thanh-Binhhh/Spring-Commerce).

Implemented tasks:

- Set up Playwright and configure the backend `baseURL`
- Create positive API test cases
- Create negative API test cases
- Validate HTTP status codes
- Validate response structure and data types
- Test query parameters

[Detailed information](#playwright-api-testing-for-bonsai-shop)

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
